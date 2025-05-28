
import React from 'npm:react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { MagicLinkEmail } from './_templates/magic-link.tsx'
import { SignupConfirmationEmail } from './_templates/signup-confirmation.tsx'
import { PasswordResetEmail } from './_templates/password-reset.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string

Deno.serve(async (req) => {
  console.log('Auth email function called:', req.method)
  
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const payload = await req.text()
    const headers = Object.fromEntries(req.headers)
    
    console.log('Received webhook payload')
    
    if (!hookSecret) {
      console.log('No webhook secret configured, processing without verification')
    }

    let emailData: any
    
    if (hookSecret) {
      const wh = new Webhook(hookSecret)
      emailData = wh.verify(payload, headers)
    } else {
      emailData = JSON.parse(payload)
    }

    const {
      user,
      email_data: { 
        token, 
        token_hash, 
        redirect_to, 
        email_action_type,
        site_url 
      },
    } = emailData

    console.log('Processing email for action type:', email_action_type)
    console.log('User email:', user.email)

    let emailTemplate: any
    let subject: string
    let html: string

    // Determine which template to use based on email action type
    switch (email_action_type) {
      case 'signup':
        emailTemplate = React.createElement(SignupConfirmationEmail, {
          supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to: redirect_to || site_url,
          email_action_type,
          user_email: user.email,
        })
        subject = 'Welcome to SAPP Security - Confirm Your Email'
        break
        
      case 'recovery':
        emailTemplate = React.createElement(PasswordResetEmail, {
          supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to: redirect_to || site_url,
          email_action_type,
          user_email: user.email,
        })
        subject = 'Reset Your SAPP Security Password'
        break
        
      case 'magiclink':
      default:
        emailTemplate = React.createElement(MagicLinkEmail, {
          supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to: redirect_to || site_url,
          email_action_type,
          user_email: user.email,
        })
        subject = 'Your SAPP Security Login Code'
        break
    }

    // Render the email template
    html = await renderAsync(emailTemplate)

    console.log('Sending email with subject:', subject)

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SAPP Security <support@sappsecurity.com>',
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw error
    }

    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    console.error('Error in send-auth-email function:', error)
    
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
          code: error.code || 'UNKNOWN_ERROR',
        },
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})

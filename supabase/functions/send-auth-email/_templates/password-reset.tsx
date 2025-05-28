
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface PasswordResetEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
  user_email: string
}

export const PasswordResetEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
  user_email,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your SAPP Security password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>SAPP Security</Heading>
          <Text style={tagline}>Secure Access Portal</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h2}>Password Reset Request</Heading>
          <Text style={text}>
            We received a request to reset the password for your SAPP Security account. If you made this request, please use the secure link below to create a new password.
          </Text>
          
          <Link
            href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
            target="_blank"
            style={button}
          >
            Reset Your Password
          </Link>
          
          <Text style={smallText}>
            This password reset link will expire in 1 hour for your security.
          </Text>
          
          <Section style={securitySection}>
            <Heading style={h3}>Security Notice</Heading>
            <Text style={securityText}>
              <strong>If you didn't request this password reset:</strong>
            </Text>
            <Text style={bulletText}>• Your account is still secure</Text>
            <Text style={bulletText}>• No action is required</Text>
            <Text style={bulletText}>• Consider changing your password if you're concerned</Text>
            <Text style={bulletText}>• Contact support if you suspect unauthorised access</Text>
          </Section>
        </Section>
        
        <Hr style={hr} />
        
        <Section style={supportSection}>
          <Heading style={h3}>Need Help?</Heading>
          <Text style={supportText}>
            If you're having trouble resetting your password or have security concerns, our support team is here to help:
          </Text>
          <Text style={supportText}>
            <strong>Email:</strong> <Link href="mailto:support@sappsecurity.com" style={supportLink}>support@sappsecurity.com</Link>
          </Text>
          <Text style={supportText}>
            <strong>Phone:</strong> +44 7349 988 999 (UK: 07349 988 999)
          </Text>
          <Text style={smallText}>
            Our support team is available Monday-Friday, 9 AM - 6 PM GMT
          </Text>
        </Section>
        
        <Hr style={hr} />
        
        <Section style={footer}>
          <Text style={footerText}>
            This email was sent to {user_email}. For security reasons, this link will expire in 1 hour.
          </Text>
          <Text style={footerText}>
            © 2024 SAPP Security Ltd. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default PasswordResetEmail

const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  backgroundColor: '#dc2626',
  padding: '24px',
  textAlign: 'center' as const,
}

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '-0.5px',
}

const tagline = {
  color: '#fecaca',
  fontSize: '14px',
  margin: '8px 0 0 0',
  fontWeight: '500',
}

const content = {
  padding: '32px 24px',
}

const h2 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const h3 = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px 0',
}

const bulletText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
  paddingLeft: '16px',
}

const securityText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 12px 0',
}

const button = {
  backgroundColor: '#dc2626',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '16px 32px',
  margin: '24px 0',
}

const securitySection = {
  backgroundColor: '#fef3f2',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #fecaca',
}

const supportSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
}

const supportText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px 0',
}

const supportLink = {
  color: '#1e40af',
  textDecoration: 'none',
}

const smallText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px 0 0 0',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
}

const footer = {
  padding: '0 24px',
}

const footerText = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0 0 8px 0',
  textAlign: 'center' as const,
}

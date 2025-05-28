
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key
const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  console.error("RESEND_API_KEY environment variable is not set");
}
const resend = new Resend(resendApiKey);

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Type definition for contact form submission
interface ContactSubmission {
  name: string;
  email: string;
  organization?: string;
  message: string;
  leadId: string;
  route?: string;
}

serve(async (req) => {
  console.log(`Request received: ${req.method} ${new URL(req.url).pathname}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    let submissionData: ContactSubmission;
    try {
      submissionData = await req.json();
      console.log("Request payload received:", {
        name: submissionData.name,
        email: submissionData.email,
        leadId: submissionData.leadId,
        route: submissionData.route || 'Not specified',
        messageLength: submissionData.message?.length || 0
      });
    } catch (parseError) {
      console.error("Failed to parse request JSON:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request format",
          details: parseError.message 
        }), 
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate required fields
    if (!submissionData.name || !submissionData.email || !submissionData.message || !submissionData.leadId) {
      console.error("Missing required fields in submission data");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }), 
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Send confirmation to the customer
    console.log(`Sending confirmation email to customer: ${submissionData.email}`);
    const customerEmailResponse = await sendCustomerEmail(submissionData);
    
    // Send internal notification to SAPP Security
    console.log(`Sending internal notification email to contact@sappsecurity.com`);
    const internalEmailResponse = await sendInternalEmail(submissionData);

    console.log("Emails sent successfully");
    return new Response(
      JSON.stringify({ 
        customerEmail: customerEmailResponse,
        internalEmail: internalEmailResponse,
        success: true
      }), 
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-contact-confirmation function:', error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send emails",
        message: error.message,
        stack: Deno.env.get("ENVIRONMENT") === 'development' ? error.stack : undefined
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

/**
 * Sends confirmation email to the customer
 */
async function sendCustomerEmail(data: ContactSubmission) {
  try {
    const response = await resend.emails.send({
      from: "SAPP Security <contact@sappsecurity.com>",
      to: [data.email],
      subject: "We've Received Your Inquiry (Ref: " + data.leadId + ")",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #20798C; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: -0.5px;">SAPP Security</h1>
            <p style="color: #dbeafe; font-size: 14px; margin: 8px 0 0 0; font-weight: 500;">Secure Access Portal</p>
          </div>
          
          <div style="padding: 32px 24px;">
            <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 16px 0;">Thank You for Contacting SAPP Security</h2>
            <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 16px 0;">Dear ${data.name},</p>
            <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 16px 0;">We have received your inquiry and will get back to you as soon as possible.</p>
            
            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Reference Number:</p>
              <code style="background-color: #ffffff; border: 2px solid #e5e7eb; border-radius: 6px; color: #1f2937; font-size: 18px; font-weight: bold; padding: 12px 16px; margin: 0; display: inline-block;">${data.leadId}</code>
            </div>
            
            <hr style="border-color: #e5e7eb; margin: 20px 0;">
            
            <div style="background-color: #f0f9ff; border-radius: 8px; padding: 24px; margin: 24px 0;">
              <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 12px 0;"><strong>Can't find this email?</strong></p>
              <p style="color: #374151; font-size: 14px; line-height: 20px; margin: 0 0 8px 0;">Please check your spam/junk folder and add <strong>contact@sappsecurity.com</strong> to your safe senders list to ensure you receive our future communications.</p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 16px 0;">
              <a href="mailto:contact@sappsecurity.com" style="color: #20798C; text-decoration: none;">Reply to this email</a> if you have any questions.
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 24px 0 0 0;">
              Best regards,<br>
              <strong>SAPP Security Team</strong>
            </p>
          </div>
          
          <div style="padding: 0 24px 24px 24px;">
            <p style="color: #9ca3af; font-size: 12px; line-height: 16px; margin: 0; text-align: center;">
              © 2024 SAPP Security Ltd. All rights reserved.
            </p>
          </div>
        </div>
      `,
      track_opens: true,
      track_clicks: true,
    });
    
    return response;
  } catch (error) {
    console.error('Error sending customer email:', error);
    throw new Error(`Failed to send customer email: ${error.message}`);
  }
}

/**
 * Sends internal notification email to SAPP Security team
 */
async function sendInternalEmail(data: ContactSubmission) {
  try {
    const response = await resend.emails.send({
      from: "SAPP Security Contact Form <contact@sappsecurity.com>",
      to: ["contact@sappsecurity.com"],
      subject: `New Contact Submission from ${data.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #20798C; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: -0.5px;">SAPP Security</h1>
            <p style="color: #dbeafe; font-size: 14px; margin: 8px 0 0 0; font-weight: 500;">Internal Notification</p>
          </div>
          
          <div style="padding: 32px 24px;">
            <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 24px 0;">New Contact Form Submission</h2>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
              <h3 style="color: #20798C; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">Contact Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 16px 8px 0; color: #6b7280; font-weight: 500; vertical-align: top; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 16px 8px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Email:</td>
                  <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${data.email}" style="color: #20798C; text-decoration: none;">${data.email}</a></td>
                </tr>
                ${data.organization ? `
                <tr>
                  <td style="padding: 8px 16px 8px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Organization:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${data.organization}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 16px 8px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Lead ID:</td>
                  <td style="padding: 8px 0; color: #1f2937;"><code style="background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 14px; color: #0f172a;">${data.leadId}</code></td>
                </tr>
                <tr>
                  <td style="padding: 8px 16px 8px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Source:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${data.route || 'Not specified'}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 24px;">
              <h3 style="color: #0c4a6e; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">Message</h3>
              <div style="background-color: #ffffff; border-radius: 6px; padding: 16px; border: 1px solid #e2e8f0;">
                <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>
            
            <div style="margin-top: 24px; padding: 16px; background-color: #fef3f2; border: 1px solid #fecaca; border-radius: 8px;">
              <h4 style="color: #dc2626; font-size: 14px; font-weight: bold; margin: 0 0 8px 0;">⚡ Action Required</h4>
              <p style="color: #374151; font-size: 14px; line-height: 20px; margin: 0;">Please respond to this inquiry within 24 hours to maintain our service standards.</p>
            </div>
          </div>
          
          <div style="padding: 0 24px 24px 24px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; line-height: 16px; margin: 16px 0 0 0; text-align: center;">
              SAPP Security Ltd. | Generated automatically from contact form submission
            </p>
          </div>
        </div>
      `,
      track_opens: true,
      track_clicks: true,
    });
    
    return response;
  } catch (error) {
    console.error('Error sending internal email:', error);
    throw new Error(`Failed to send internal notification email: ${error.message}`);
  }
}

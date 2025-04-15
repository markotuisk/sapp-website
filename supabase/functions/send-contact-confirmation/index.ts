
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
        // Not logging full message for privacy reasons
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
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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
      subject: "We've Received Your Inquiry",
      html: `
        <h1>Thank You for Contacting SAPP Security</h1>
        <p>Dear ${data.name},</p>
        <p>We have received your inquiry and will get back to you as soon as possible.</p>
        <p>Reference Number: ${data.leadId}</p>
        <br>
        <p>Best regards,<br>SAPP Security Team</p>
      `,
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
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.organization ? `<p><strong>Organization:</strong> ${data.organization}</p>` : ''}
        <p><strong>Lead ID:</strong> ${data.leadId}</p>
        <h2>Message:</h2>
        <p>${data.message}</p>
      `,
    });
    
    return response;
  } catch (error) {
    console.error('Error sending internal email:', error);
    throw new Error(`Failed to send internal notification email: ${error.message}`);
  }
}

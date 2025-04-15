
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactSubmission {
  name: string;
  email: string;
  organization?: string;
  message: string;
  leadId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const submissionData: ContactSubmission = await req.json();

    // Send confirmation to the customer
    const customerEmailResponse = await resend.emails.send({
      from: "SAPP Security <contact@sappsecurity.com>",
      to: [submissionData.email],
      subject: "We've Received Your Inquiry",
      html: `
        <h1>Thank You for Contacting SAPP Security</h1>
        <p>Dear ${submissionData.name},</p>
        <p>We have received your inquiry and will get back to you as soon as possible.</p>
        <p>Reference Number: ${submissionData.leadId}</p>
        <br>
        <p>Best regards,<br>SAPP Security Team</p>
      `,
    });

    // Send internal notification to SAPP Security
    const internalEmailResponse = await resend.emails.send({
      from: "SAPP Security Contact Form <contact@sappsecurity.com>",
      to: ["contact@sappsecurity.com"],
      subject: `New Contact Submission from ${submissionData.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${submissionData.name}</p>
        <p><strong>Email:</strong> ${submissionData.email}</p>
        ${submissionData.organization ? `<p><strong>Organization:</strong> ${submissionData.organization}</p>` : ''}
        <p><strong>Lead ID:</strong> ${submissionData.leadId}</p>
        <h2>Message:</h2>
        <p>${submissionData.message}</p>
      `,
    });

    return new Response(JSON.stringify({ 
      customerEmail: customerEmailResponse,
      internalEmail: internalEmailResponse 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in send-contact-confirmation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

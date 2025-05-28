
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

interface SignupConfirmationEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
  user_email: string
}

export const SignupConfirmationEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
  user_email,
}: SignupConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to SAPP Security - Please confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>SAPP Security</Heading>
          <Text style={tagline}>Secure Access Portal</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h2}>Welcome to SAPP Security!</Heading>
          <Text style={text}>
            Thank you for registering with SAPP Security's Client Portal. To complete your registration and secure your account, please confirm your email address.
          </Text>
          
          <Section style={codeSection}>
            <Text style={codeLabel}>Your confirmation code:</Text>
            <code style={code}>{token}</code>
          </Section>
          
          <Text style={text}>
            Or click the secure link below to confirm your email automatically:
          </Text>
          
          <Link
            href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
            target="_blank"
            style={button}
          >
            Confirm Email & Access Portal
          </Link>
          
          <Text style={smallText}>
            This confirmation link will expire in 24 hours for your security.
          </Text>
          
          <Section style={welcomeSection}>
            <Heading style={h3}>What's Next?</Heading>
            <Text style={text}>
              Once your email is confirmed, you'll have access to:
            </Text>
            <Text style={bulletText}>• Secure document access</Text>
            <Text style={bulletText}>• Service status updates</Text>
            <Text style={bulletText}>• Direct communication with our team</Text>
            <Text style={bulletText}>• Meeting scheduling and support requests</Text>
          </Section>
        </Section>
        
        <Hr style={hr} />
        
        <Section style={supportSection}>
          <Heading style={h3}>Need Help?</Heading>
          <Text style={supportText}>
            If you're having trouble confirming your email or have any questions about your account, our support team is ready to assist:
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
            This email was sent to {user_email}. If you didn't create this account, please contact our support team immediately.
          </Text>
          <Text style={footerText}>
            © 2024 SAPP Security Ltd. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default SignupConfirmationEmail

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
  backgroundColor: '#1e40af',
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
  color: '#dbeafe',
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

const codeSection = {
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  padding: '24px',
  textAlign: 'center' as const,
  margin: '24px 0',
}

const codeLabel = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 12px 0',
  fontWeight: '500',
}

const code = {
  backgroundColor: '#ffffff',
  border: '2px solid #e5e7eb',
  borderRadius: '6px',
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '4px',
  padding: '16px 24px',
  margin: '0',
  display: 'inline-block',
}

const button = {
  backgroundColor: '#1e40af',
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

const welcomeSection = {
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
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

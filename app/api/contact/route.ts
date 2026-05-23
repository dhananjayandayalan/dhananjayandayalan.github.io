import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { contactSchema } from '@/lib/contact';

const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_TO_EMAIL',
  'CONTACT_FROM_EMAIL'
] as const;

function getMissingEnvVars() {
  return requiredEnvVars.filter((envVar) => !process.env[envVar]);
}

export async function POST(request: Request) {
  const missingEnvVars = getMissingEnvVars();

  if (missingEnvVars.length > 0) {
    console.error('Missing contact email environment variables:', missingEnvVars);
    return NextResponse.json(
      { message: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  try {
    const json = await request.json();
    const submission = contactSchema.parse(json);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const submittedAt = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: process.env.CONTACT_TIMEZONE || 'Asia/Calcutta'
    });

    const escapedName = escapeHtml(submission.name);
    const escapedEmail = escapeHtml(submission.email);
    const escapedMobile = escapeHtml(submission.mobile || 'Not provided');
    const escapedSubmittedAt = escapeHtml(submittedAt);
    const escapedMessage = escapeHtml(submission.message).replace(/\n/g, '<br />');

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: submission.email,
      subject: `New contact form message from ${submission.name}`,
      text: [
        'NEW CONTACT FORM SUBMISSION',
        '',
        'Contact details',
        `- Name: ${submission.name}`,
        `- Email: ${submission.email}`,
        `- Mobile: ${submission.mobile || 'Not provided'}`,
        `- Submitted: ${submittedAt}`,
        '',
        'Message:',
        '--------',
        submission.message
      ].join('\n'),
      html: `
        <div style="margin:0; padding:24px; background-color:#f3f7fb; font-family:Arial, Helvetica, sans-serif; color:#10233f;">
          <div style="max-width:680px; margin:0 auto; background-color:#ffffff; border:1px solid #d9e3f0; border-radius:20px; overflow:hidden;">
            <div style="padding:24px 28px; background:linear-gradient(135deg, #163a70, #2563eb); color:#ffffff;">
              <p style="margin:0 0 8px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; opacity:0.85;">
                Portfolio Contact Form
              </p>
              <h1 style="margin:0; font-size:26px; line-height:1.3;">
                New message from ${escapedName}
              </h1>
            </div>

            <div style="padding:28px;">
              <table role="presentation" style="width:100%; border-collapse:separate; border-spacing:0; margin-bottom:24px; background-color:#f8fbff; border:1px solid #d9e3f0; border-radius:16px;">
                <tr>
                  <td colspan="2" style="padding:18px 20px 8px; font-size:15px; font-weight:700; color:#163a70;">
                    Contact details
                  </td>
                </tr>
                <tr>
                  <td style="width:140px; padding:10px 20px; font-size:14px; font-weight:600; color:#4b5f7a;">Name</td>
                  <td style="padding:10px 20px; font-size:14px; color:#10233f;">${escapedName}</td>
                </tr>
                <tr>
                  <td style="width:140px; padding:10px 20px; font-size:14px; font-weight:600; color:#4b5f7a;">Email</td>
                  <td style="padding:10px 20px; font-size:14px; color:#10233f;">
                    <a href="mailto:${escapedEmail}" style="color:#2563eb; text-decoration:none;">${escapedEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="width:140px; padding:10px 20px; font-size:14px; font-weight:600; color:#4b5f7a;">Mobile</td>
                  <td style="padding:10px 20px; font-size:14px; color:#10233f;">${escapedMobile}</td>
                </tr>
                <tr>
                  <td style="width:140px; padding:10px 20px 18px; font-size:14px; font-weight:600; color:#4b5f7a;">Submitted</td>
                  <td style="padding:10px 20px 18px; font-size:14px; color:#10233f;">${escapedSubmittedAt}</td>
                </tr>
              </table>

              <div style="border:1px solid #d9e3f0; border-radius:16px; padding:20px; background-color:#ffffff;">
                <p style="margin:0 0 12px; font-size:15px; font-weight:700; color:#163a70;">
                  Message
                </p>
                <p style="margin:0; font-size:15px; line-height:1.7; color:#24364d;">
                  ${escapedMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    });

    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact form submission failed:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Please check the form fields and try again.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Unable to send your message right now. Please try again later.' },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

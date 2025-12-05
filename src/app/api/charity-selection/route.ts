import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, reward } = body;

    if (!email || !reward) {
      return NextResponse.json(
        { error: "Email and reward selection are required" },
        { status: 400 }
      );
    }

    const rewardLabel =
      reward === "starbucks"
        ? "$20 Starbucks Gift Card"
        : "$36 to Children's Cancer Research";

    // In production, you would integrate with an email service like:
    // - Resend (resend.com)
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    
    // For now, we'll log the submission and prepare the email data
    const emailData = {
      to: "am@equi.com",
      subject: `Wordle for Charity - New Winner!`,
      text: `
A user has won the Wordle for Charity game!

Email: ${email}
Selected Reward: ${rewardLabel}

Please process this reward accordingly.

---
Sent from Equi Games
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #194E3B; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 600; color: #404040; }
    .value { font-size: 18px; color: #0F2319; }
    .reward { background: #E0A920; color: #0F2319; padding: 12px; border-radius: 6px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🎉 Wordle for Charity Winner!</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Winner's Email</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Selected Reward</div>
        <div class="reward">${rewardLabel}</div>
      </div>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="color: #666; font-size: 14px;">
        Please process this reward accordingly. This submission was made through the Equi Games platform.
      </p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // Log for development/debugging
    console.log("=== Wordle for Charity Submission ===");
    console.log("Email:", email);
    console.log("Reward:", rewardLabel);
    console.log("Email would be sent to: am@equi.com");
    console.log("=====================================");

    // If you have Resend configured, uncomment and use:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'games@equi.com',
    //   to: 'am@equi.com',
    //   subject: emailData.subject,
    //   html: emailData.html,
    // });

    // If you have SendGrid configured:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: 'am@equi.com',
    //   from: 'games@equi.com',
    //   subject: emailData.subject,
    //   html: emailData.html,
    // });

    // For now, return success (the submission is logged)
    // In production, add proper email service integration
    
    return NextResponse.json({
      success: true,
      message: "Submission received successfully",
      data: {
        email,
        reward: rewardLabel,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error processing charity selection:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}


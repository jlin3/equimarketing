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

    const rewardEmoji = reward === "starbucks" ? "☕" : "💝";

    // Send to Slack
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (slackWebhookUrl) {
      try {
        const slackMessage = {
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🎉 Wordle for Charity Winner!",
                emoji: true,
              },
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: `*Email:*\n${email}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Reward Selected:*\n${rewardEmoji} ${rewardLabel}`,
                },
              ],
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Submitted at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET`,
                },
              ],
            },
          ],
        };

        const slackResponse = await fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackMessage),
        });

        if (!slackResponse.ok) {
          console.error("Slack webhook failed:", await slackResponse.text());
        } else {
          console.log("Slack notification sent successfully");
        }
      } catch (slackError) {
        console.error("Error sending Slack notification:", slackError);
      }
    } else {
      console.warn("SLACK_WEBHOOK_URL not configured");
    }

    // Log for backup/debugging
    console.log("=== Wordle for Charity Submission ===");
    console.log("Email:", email);
    console.log("Reward:", rewardLabel);
    console.log("Timestamp:", new Date().toISOString());
    console.log("=====================================");

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

import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

interface Submission {
  email: string;
  reward: string;
  rewardLabel: string;
  timestamp: string;
}

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
        ? "$10 Starbucks Gift Card"
        : "$15 to Scholars of Finance";

    const rewardEmoji = reward === "starbucks" ? "☕" : "💝";
    const timestamp = new Date().toISOString();

    // Store in Vercel KV database
    const submission: Submission = {
      email,
      reward,
      rewardLabel,
      timestamp,
    };

    try {
      // Store each submission with a unique key
      const submissionKey = `wordle:submission:${Date.now()}`;
      await kv.set(submissionKey, submission);
      
      // Also add to a list for easy retrieval
      await kv.lpush("wordle:submissions", JSON.stringify(submission));
      
      console.log("✅ Submission saved to database:", submissionKey);
    } catch (kvError) {
      console.error("KV storage error (continuing anyway):", kvError);
      // Don't fail the request if KV fails - we'll still try Slack
    }

    // Send to Slack as backup notification
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (slackWebhookUrl) {
      try {
        const slackMessage = {
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🎉 Wordle Game Submission!",
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
          console.log("✅ Slack notification sent successfully");
        }
      } catch (slackError) {
        console.error("Error sending Slack notification:", slackError);
      }
    } else {
      console.warn("⚠️ SLACK_WEBHOOK_URL not configured");
    }

    // Log for backup/debugging
    console.log("=== Wordle Game Submission ===");
    console.log("Email:", email);
    console.log("Reward:", rewardLabel);
    console.log("Timestamp:", timestamp);
    console.log("==============================");

    return NextResponse.json({
      success: true,
      message: "Submission received successfully",
      data: {
        email,
        reward: rewardLabel,
        timestamp,
      },
    });
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all submissions (for admin use)
export async function GET(request: NextRequest) {
  try {
    // Simple auth check - you can enhance this later
    const authHeader = request.headers.get("authorization");
    const adminKey = process.env.ADMIN_API_KEY;
    
    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const submissions = await kv.lrange("wordle:submissions", 0, -1);
    const parsed = submissions.map((s) => 
      typeof s === "string" ? JSON.parse(s) : s
    );

    return NextResponse.json({
      success: true,
      count: parsed.length,
      submissions: parsed,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

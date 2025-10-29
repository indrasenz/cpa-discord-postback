// api/postback.js

export default async function handler(req, res) {
  try {
    const { cid, sum, s1 } = req.query;

    if (!cid || !sum) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // 🔒 Webhook disembunyikan ke environment variable
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_WEBHOOK_URL) {
      return res.status(500).json({ error: "Webhook not configured" });
    }

    // bisa handle beberapa click_id
    const clickIds = cid.split(",");

    for (const clickId of clickIds) {
      const message = {
        content: `💵 **New Lead Received!**  
        🧩 Click ID: \`${clickId}\`  
        💰 Payout: **$${sum}**  
        🎯 Source: ${s1 || "unknown"}`
      };

      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

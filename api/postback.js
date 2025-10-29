// File: api/postback.js
export default async function handler(req, res) {
  const { click_id, amount, offer_id } = req.query;

  const message = `🟢 **New CPA Conversion!**
💰 Amount: $${amount || '0'}
🔗 Click ID: ${click_id || 'unknown'}
🎯 Offer ID: ${offer_id || 'N/A'}`;

  // Ganti nanti dengan environment variable
  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending to Discord");
  }
}

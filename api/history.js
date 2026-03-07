export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ ok: false, error: "Missing Authorization header" });

  const channel = req.query.channel;
  if (!channel) return res.status(400).json({ ok: false, error: "Missing channel parameter" });

  const response = await fetch(
    `https://slack.com/api/conversations.history?channel=${encodeURIComponent(channel)}&limit=100`,
    { headers: { Authorization: authHeader } }
  );
  const data = await response.json();
  return res.status(200).json(data);
}

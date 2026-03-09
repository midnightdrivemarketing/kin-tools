export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ ok: false, error: "Missing Authorization header" });

  const { channel, thread_ts, text } = req.body || {};
  if (!channel || !thread_ts || !text) {
    return res.status(400).json({ ok: false, error: "Missing channel, thread_ts, or text" });
  }

  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channel, thread_ts, text }),
  });
  const data = await response.json();
  return res.status(200).json(data);
}

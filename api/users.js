export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ ok: false, error: "Missing Authorization header" });

  const response = await fetch(
    "https://slack.com/api/users.list?limit=200",
    { headers: { Authorization: authHeader } }
  );
  const data = await response.json();
  return res.status(200).json(data);
}

import { useState, useCallback } from "react";

const CHANNEL_NAME = "kin-battlecard-requests";

const STYLES = `
  .page-header { margin-bottom: 32px; }

  .page-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: #4ADE80;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .page-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #f8fafc;
    letter-spacing: -0.02em;
  }

  .page-subtitle {
    font-size: 13px;
    color: #64748b;
    margin-top: 6px;
  }

  .token-section {
    background: #161b27;
    border: 1px solid #1e293b;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 24px;
  }

  .token-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .token-row { display: flex; gap: 8px; }

  .token-input {
    flex: 1;
    background: #0F1117;
    border: 1px solid #1e293b;
    border-radius: 6px;
    padding: 9px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #e2e8f0;
    outline: none;
    transition: border-color 0.15s;
  }

  .token-input:focus { border-color: #4ADE80; }
  .token-input::placeholder { color: #334155; }

  .btn {
    background: #4ADE80;
    color: #0F1117;
    border: none;
    border-radius: 6px;
    padding: 9px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: opacity 0.15s, transform 0.1s;
    white-space: nowrap;
  }

  .btn:hover { opacity: 0.88; }
  .btn:active { transform: scale(0.97); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .btn-ghost {
    background: transparent;
    color: #64748b;
    border: 1px solid #1e293b;
    padding: 6px 12px;
    font-size: 11px;
  }

  .btn-ghost:hover { color: #e2e8f0; border-color: #334155; opacity: 1; }

  .btn-copy {
    background: transparent;
    color: #4ADE80;
    border: 1px solid #166534;
    padding: 6px 12px;
    font-size: 11px;
  }

  .btn-copy:hover { background: #052e16; opacity: 1; }
  .btn-copy.copied { color: #86efac; border-color: #4ADE80; }

  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    min-height: 28px;
  }

  .status-text { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #64748b; }
  .status-text.loading { color: #4ADE80; animation: pulse 1.2s ease-in-out infinite; }
  .status-text.error { color: #f87171; }

  .count-badge {
    background: #052e16;
    color: #4ADE80;
    border: 1px solid #166534;
    border-radius: 20px;
    padding: 3px 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
  }

  .empty-state {
    text-align: center;
    padding: 56px 24px;
    color: #334155;
    font-size: 13px;
  }

  .empty-icon { font-size: 32px; margin-bottom: 12px; opacity: 0.5; }

  .lead-list { display: flex; flex-direction: column; gap: 10px; }

  .lead-card {
    background: #161b27;
    border: 1px solid #1e293b;
    border-radius: 10px;
    padding: 16px 18px;
    transition: border-color 0.15s;
    animation: slideIn 0.2s ease both;
  }

  .lead-card:hover { border-color: #2d3f55; }

  .lead-card-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
  }

  .lead-index {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    color: #4ADE80;
    background: #052e16;
    border: 1px solid #166534;
    border-radius: 4px;
    padding: 2px 7px;
    white-space: nowrap;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .lead-company {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 700;
    color: #f8fafc;
    letter-spacing: -0.01em;
  }

  .lead-fields { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
  .lead-field { display: flex; align-items: baseline; gap: 8px; font-size: 12px; }

  .field-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    min-width: 60px;
    flex-shrink: 0;
  }

  .field-value { color: #94a3b8; word-break: break-all; }
  .field-value a { color: #4ADE80; text-decoration: none; opacity: 0.85; transition: opacity 0.15s; }
  .field-value a:hover { opacity: 1; }

  .lead-actions { display: flex; gap: 6px; flex-wrap: wrap; }

  .divider { height: 1px; background: #1e293b; margin: 24px 0; }

  .batch-section {}
  .batch-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }

  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function parseBotMessages(messages) {
  const leads = [];
  for (const msg of messages) {
    const text = msg.text || "";
    if (!text.includes("new battlecard request")) continue;
    if (msg.reply_count && msg.reply_count > 0) continue;

    const companyMatch = text.match(/Company Name\?([^\n]+)/);
    const websiteMatch = text.match(/Company Website\?([^\n]+)/);
    const linkedinMatch = text.match(/Person's LinkedIn URL\?([^\n]+)/);

    if (companyMatch && websiteMatch && linkedinMatch) {
      leads.push({
        id: msg.ts,
        company: companyMatch[1].trim(),
        website: websiteMatch[1].trim(),
        linkedin: linkedinMatch[1].trim(),
        ts: new Date(parseFloat(msg.ts) * 1000).toLocaleDateString("en-CA", {
          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
        }),
      });
    }
  }
  return leads;
}

function buildCoworkPrompt(lead) {
  return `Company Name? ${lead.company}\nCompany Website? ${lead.website}\nPerson's LinkedIn URL? ${lead.linkedin}`;
}

export default function Queue() {
  const [token, setToken] = useState(() => localStorage.getItem("kin_slack_token") || "");
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const fetchLeads = useCallback(async () => {
    if (!token.trim()) return;
    localStorage.setItem("kin_slack_token", token.trim());
    setStatus("loading");
    setErrorMsg("");
    setLeads([]);

    try {
      const listRes = await fetch(
        "/api/channels",
        { headers: { Authorization: `Bearer ${token.trim()}` } }
      );
      const listData = await listRes.json();
      if (!listData.ok) throw new Error(listData.error || "Failed to fetch channels");

      const channel = listData.channels?.find((c) => c.name === CHANNEL_NAME);
      if (!channel) throw new Error(`Channel #${CHANNEL_NAME} not found. Make sure the app has been invited to it.`);

      const histRes = await fetch(
        `/api/history?channel=${channel.id}`,
        { headers: { Authorization: `Bearer ${token.trim()}` } }
      );
      const histData = await histRes.json();
      if (!histData.ok) throw new Error(histData.error || "Failed to fetch messages");

      setLeads(parseBotMessages(histData.messages || []));
      setStatus("done");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }, [token]);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    });
  };

  return (
    <>
      <style>{STYLES}</style>

      <div className="page-header">
        <div className="page-eyebrow">Kin Sales</div>
        <div className="page-title">Battle Card Queue</div>
        <div className="page-subtitle">Shows undelivered requests from #{CHANNEL_NAME}</div>
      </div>

      <div className="token-section">
        <div className="token-label">Slack Bot Token</div>
        <div className="token-row">
          <input
            className="token-input"
            type="password"
            placeholder="xoxb-..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
          />
          <button className="btn" onClick={fetchLeads} disabled={!token.trim() || status === "loading"}>
            {status === "loading" ? "Pulling..." : "Pull Requests"}
          </button>
        </div>
      </div>

      <div className="status-bar">
        {status === "loading" && <span className="status-text loading">Fetching from Slack...</span>}
        {status === "error" && <span className="status-text error">{errorMsg}</span>}
        {status === "done" && (
          <>
            <span className="status-text">Last fetched just now</span>
            {leads.length > 0 && <span className="count-badge">{leads.length} pending</span>}
          </>
        )}
        {status === "idle" && <span className="status-text">Enter your token to load the queue</span>}
      </div>

      {status === "done" && leads.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">✓</div>
          All caught up. Every request has a card delivered.
        </div>
      )}

      {leads.length > 0 && (
        <>
          <div className="lead-list">
            {leads.map((lead, i) => (
              <div className="lead-card" key={lead.id}>
                <div className="lead-card-top">
                  <span className="lead-index">#{String(i + 1).padStart(2, "0")}</span>
                  <span className="lead-company">{lead.company}</span>
                </div>
                <div className="lead-fields">
                  <div className="lead-field">
                    <span className="field-label">Website</span>
                    <span className="field-value">
                      <a href={lead.website} target="_blank" rel="noreferrer">{lead.website}</a>
                    </span>
                  </div>
                  <div className="lead-field">
                    <span className="field-label">LinkedIn</span>
                    <span className="field-value">
                      <a href={lead.linkedin} target="_blank" rel="noreferrer">{lead.linkedin}</a>
                    </span>
                  </div>
                  <div className="lead-field">
                    <span className="field-label">Received</span>
                    <span className="field-value">{lead.ts}</span>
                  </div>
                </div>
                <div className="lead-actions">
                  <button
                    className={`btn btn-copy ${copiedId === lead.id ? "copied" : ""}`}
                    onClick={() => copy(buildCoworkPrompt(lead), lead.id)}
                  >
                    {copiedId === lead.id ? "Copied" : "Copy for Cowork"}
                  </button>
                  <a href={lead.linkedin} target="_blank" rel="noreferrer">
                    <button className="btn btn-ghost">Open LinkedIn</button>
                  </a>
                  <a href={lead.website} target="_blank" rel="noreferrer">
                    <button className="btn btn-ghost">Open Website</button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="batch-section">
            <div className="batch-label">Batch copy</div>
            <button
              className={`btn btn-copy ${copiedId === "all" ? "copied" : ""}`}
              onClick={() => copy(leads.map((l) => buildCoworkPrompt(l)).join("\n\n---\n\n"), "all")}
            >
              {copiedId === "all" ? "Copied all" : "Copy All for Cowork"}
            </button>
          </div>
        </>
      )}
    </>
  );
}

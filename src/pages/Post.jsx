import { useState, useCallback } from "react";

const CHANNEL_NAME = "kin-battlecard-requests";
const ERIC_DISPLAY = "Eric Harrison";

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

  .btn-danger {
    background: #ef4444;
    color: #fff;
  }

  .btn-ghost {
    background: transparent;
    color: #64748b;
    border: 1px solid #1e293b;
    padding: 6px 12px;
    font-size: 11px;
  }

  .btn-ghost:hover { color: #e2e8f0; border-color: #334155; opacity: 1; }

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
  .status-text.success { color: #4ADE80; }

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
  .lead-card.posted { border-color: #166534; opacity: 0.6; }

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

  .bulk-section {
    background: #161b27;
    border: 1px solid #1e293b;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 24px;
  }

  .bulk-textarea {
    width: 100%;
    background: #0F1117;
    border: 1px solid #1e293b;
    border-radius: 6px;
    padding: 10px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #e2e8f0;
    outline: none;
    resize: vertical;
    min-height: 120px;
    transition: border-color 0.15s;
    line-height: 1.6;
  }

  .bulk-textarea:focus { border-color: #4ADE80; }
  .bulk-textarea::placeholder { color: #334155; }

  .bulk-hint {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #475569;
    margin-top: 8px;
  }

  .mapped-url {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #4ADE80;
    word-break: break-all;
    opacity: 0.85;
  }

  .no-url {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #334155;
    font-style: italic;
  }

  .divider { height: 1px; background: #1e293b; margin: 24px 0; }

  .batch-section { display: flex; gap: 10px; align-items: center; }
  .batch-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }

  .post-result {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    margin-top: 12px;
    padding: 10px 14px;
    border-radius: 6px;
  }

  .post-result.success { background: #052e16; color: #4ADE80; border: 1px solid #166534; }
  .post-result.error { background: #1c1012; color: #f87171; border: 1px solid #7f1d1d; }

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

    const companyMatch = text.match(/Company Name\?\*?\s*\n?\s*([^\n]+)/);
    const websiteMatch = text.match(/Company Website\?\*?\s*\n?\s*([^\n]+)/);
    const linkedinMatch = text.match(/Person's LinkedIn URL\?\*?\s*\n?\s*([^\n]+)/);

    if (companyMatch && websiteMatch && linkedinMatch) {
      const clean = (s) => s.trim().replace(/^[<*]+|[>*]+$/g, "").replace(/\|.*$/, "").trim();
      const ensureUrl = (s) => (s && !/^https?:\/\//i.test(s) ? `https://${s}` : s);
      leads.push({
        id: msg.ts,
        company: clean(companyMatch[1]),
        website: ensureUrl(clean(websiteMatch[1])),
        linkedin: ensureUrl(clean(linkedinMatch[1])),
        ts: new Date(parseFloat(msg.ts) * 1000).toLocaleDateString("en-CA", {
          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
        }),
      });
    }
  }
  leads.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
  return leads;
}

function parseSlackThreadUrl(url) {
  const match = url.match(/archives\/([A-Z0-9]+)\/p(\d+)/);
  if (!match) return null;
  const channel = match[1];
  const raw = match[2];
  const thread_ts = raw.slice(0, -6) + "." + raw.slice(-6);
  return { channel, thread_ts };
}

export default function Post() {
  const [token, setToken] = useState(() => localStorage.getItem("kin_slack_token") || "");
  const [leads, setLeads] = useState([]);
  const [bulkText, setBulkText] = useState("");
  const [channelId, setChannelId] = useState(null);
  const [ericUserId, setEricUserId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [postStatus, setPostStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [postResults, setPostResults] = useState([]);

  // Quick post state
  const [quickThreadUrl, setQuickThreadUrl] = useState("");
  const [quickCardUrl, setQuickCardUrl] = useState("");
  const [quickStatus, setQuickStatus] = useState("idle");
  const [quickMsg, setQuickMsg] = useState("");

  // Parse bulk text into ordered URL list, mapped to leads by position
  const parsedUrls = bulkText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const urlMap = {};
  leads.forEach((lead, i) => {
    if (parsedUrls[i]) urlMap[lead.id] = parsedUrls[i];
  });

  const fetchLeads = useCallback(async () => {
    if (!token.trim()) return;
    localStorage.setItem("kin_slack_token", token.trim());
    setStatus("loading");
    setErrorMsg("");
    setLeads([]);
    setBulkText("");
    setPostResults([]);
    setPostStatus("idle");

    try {
      // Fetch channels and users in parallel
      const [listRes, usersRes] = await Promise.all([
        fetch("/api/channels", { headers: { Authorization: `Bearer ${token.trim()}` } }),
        fetch("/api/users", { headers: { Authorization: `Bearer ${token.trim()}` } }),
      ]);

      const listData = await listRes.json();
      if (!listData.ok) throw new Error(listData.error || "Failed to fetch channels");

      const channel = listData.channels?.find((c) => c.name === CHANNEL_NAME);
      if (!channel) throw new Error(`Channel #${CHANNEL_NAME} not found.`);
      setChannelId(channel.id);

      const usersData = await usersRes.json();
      if (usersData.ok) {
        const eric = usersData.members?.find(
          (u) => u.real_name === ERIC_DISPLAY || u.profile?.real_name === ERIC_DISPLAY
        );
        if (eric) setEricUserId(eric.id);
      }

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

  const quickPost = useCallback(async () => {
    if (!token.trim() || !quickThreadUrl.trim() || !quickCardUrl.trim()) return;
    localStorage.setItem("kin_slack_token", token.trim());

    const parsed = parseSlackThreadUrl(quickThreadUrl.trim());
    if (!parsed) {
      setQuickStatus("error");
      setQuickMsg("Invalid Slack thread URL. Right-click a message → Copy link.");
      return;
    }

    setQuickStatus("posting");
    setQuickMsg("");

    try {
      // Try to resolve Eric's user ID if we don't have it yet
      let mention = `@${ERIC_DISPLAY}`;
      if (!ericUserId) {
        try {
          const usersRes = await fetch("/api/users", { headers: { Authorization: `Bearer ${token.trim()}` } });
          const usersData = await usersRes.json();
          if (usersData.ok) {
            const eric = usersData.members?.find(
              (u) => u.real_name === ERIC_DISPLAY || u.profile?.real_name === ERIC_DISPLAY
            );
            if (eric) {
              setEricUserId(eric.id);
              mention = `<@${eric.id}>`;
            }
          }
        } catch {}
      } else {
        mention = `<@${ericUserId}>`;
      }

      const res = await fetch("/api/reply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: parsed.channel,
          thread_ts: parsed.thread_ts,
          text: `${mention} ${quickCardUrl.trim()}`,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Slack API error");

      setQuickStatus("success");
      setQuickMsg("Posted!");
      setQuickThreadUrl("");
      setQuickCardUrl("");
    } catch (err) {
      setQuickStatus("error");
      setQuickMsg(err.message);
    }
  }, [token, quickThreadUrl, quickCardUrl, ericUserId]);

  const filledCount = leads.filter((l) => urlMap[l.id]).length;

  const postAll = useCallback(async () => {
    const toPost = leads.filter((l) => urlMap[l.id]);
    if (toPost.length === 0) return;

    setPostStatus("posting");
    setPostResults([]);
    const results = [];

    for (const lead of toPost) {
      const url = urlMap[lead.id];
      const mention = ericUserId ? `<@${ericUserId}>` : `@${ERIC_DISPLAY}`;
      const text = `${mention} ${url}`;

      try {
        const res = await fetch("/api/reply", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channel: channelId, thread_ts: lead.id, text }),
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || "Slack API error");
        results.push({ company: lead.company, ok: true });
      } catch (err) {
        results.push({ company: lead.company, ok: false, error: err.message });
      }
    }

    setPostResults(results);
    setPostStatus("done");
  }, [leads, urlMap, token, channelId, ericUserId]);

  const allSucceeded = postResults.length > 0 && postResults.every((r) => r.ok);

  return (
    <>
      <style>{STYLES}</style>

      <div className="page-header">
        <div className="page-eyebrow">Kin Sales</div>
        <div className="page-title">Post Battle Cards</div>
        <div className="page-subtitle">
          Reply to pending requests in #{CHANNEL_NAME} with final URLs
        </div>
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
            {status === "loading" ? "Loading..." : "Load Pending"}
          </button>
        </div>
      </div>

      <div className="token-section">
        <div className="token-label">Quick Post (single thread)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            className="token-input"
            type="text"
            placeholder="Slack thread URL (right-click message → Copy link)"
            value={quickThreadUrl}
            onChange={(e) => { setQuickThreadUrl(e.target.value); setQuickStatus("idle"); }}
          />
          <div className="token-row">
            <input
              className="token-input"
              type="text"
              placeholder="Battle card URL"
              value={quickCardUrl}
              onChange={(e) => { setQuickCardUrl(e.target.value); setQuickStatus("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && quickPost()}
            />
            <button
              className="btn"
              onClick={quickPost}
              disabled={!token.trim() || !quickThreadUrl.trim() || !quickCardUrl.trim() || quickStatus === "posting"}
            >
              {quickStatus === "posting" ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
        {quickStatus === "error" && <div className="status-text error" style={{ marginTop: 8 }}>{quickMsg}</div>}
        {quickStatus === "success" && <div className="status-text success" style={{ marginTop: 8 }}>{quickMsg}</div>}
      </div>

      <div className="divider" />

      <div className="status-bar">
        {status === "loading" && <span className="status-text loading">Fetching from Slack...</span>}
        {status === "error" && <span className="status-text error">{errorMsg}</span>}
        {status === "done" && (
          <>
            <span className="status-text">
              {ericUserId ? `@${ERIC_DISPLAY} found` : `Could not find @${ERIC_DISPLAY} — will use display name`}
            </span>
            {leads.length > 0 && <span className="count-badge">{leads.length} pending</span>}
          </>
        )}
        {status === "idle" && <span className="status-text">Enter your token to load pending requests</span>}
      </div>

      {status === "done" && leads.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">&#10003;</div>
          No pending requests. All messages already have replies.
        </div>
      )}

      {leads.length > 0 && (
        <>
          <div className="bulk-section">
            <div className="token-label">Paste URLs (one per line, in order)</div>
            <textarea
              className="bulk-textarea"
              placeholder={`Line 1 → ${leads[0]?.company || "first lead"}\nLine 2 → ${leads[1]?.company || "second lead"}\nLine 3 → ...`}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              disabled={postStatus === "posting"}
            />
            <div className="bulk-hint">
              {parsedUrls.length} URL{parsedUrls.length !== 1 ? "s" : ""} pasted
              {parsedUrls.length > leads.length && ` (only ${leads.length} leads — extra URLs will be ignored)`}
            </div>
          </div>

          <div className="token-label" style={{ marginBottom: 12 }}>Mapping Preview</div>
          <div className="lead-list">
            {leads.map((lead, i) => {
              const url = urlMap[lead.id];
              const posted = postResults.find((r) => r.company === lead.company);
              return (
                <div className={`lead-card${posted?.ok ? " posted" : ""}`} key={lead.id}>
                  <div className="lead-card-top">
                    <span className="lead-index">#{String(i + 1).padStart(2, "0")}</span>
                    <span className="lead-company">{lead.company}</span>
                    {posted?.ok && (
                      <span style={{ color: "#4ADE80", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", marginLeft: "auto" }}>
                        Posted
                      </span>
                    )}
                    {posted && !posted.ok && (
                      <span style={{ color: "#f87171", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", marginLeft: "auto" }}>
                        Failed: {posted.error}
                      </span>
                    )}
                  </div>
                  <div className="lead-fields">
                    <div className="lead-field">
                      <span className="field-label">Website</span>
                      <span className="field-value">
                        <a href={lead.website} target="_blank" rel="noreferrer">{lead.website}</a>
                      </span>
                    </div>
                    <div className="lead-field">
                      <span className="field-label">URL</span>
                      {url
                        ? <span className="mapped-url">{url}</span>
                        : <span className="no-url">No URL (line {i + 1})</span>
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="divider" />

          <div className="batch-section">
            <button
              className="btn"
              onClick={postAll}
              disabled={filledCount === 0 || postStatus === "posting"}
            >
              {postStatus === "posting"
                ? "Posting..."
                : `Post ${filledCount} Reply${filledCount !== 1 ? "s" : ""}`}
            </button>
            {filledCount > 0 && postStatus !== "posting" && (
              <span className="status-text" style={{ marginLeft: 8 }}>
                Each reply: @{ERIC_DISPLAY} + URL
              </span>
            )}
          </div>

          {postResults.length > 0 && (
            <div className={`post-result ${allSucceeded ? "success" : "error"}`}>
              {postResults.map((r, i) => (
                <div key={i}>
                  {r.ok ? "+" : "x"} {r.company} — {r.ok ? "Posted" : r.error}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

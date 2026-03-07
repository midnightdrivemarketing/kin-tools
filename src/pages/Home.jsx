import { Link } from "react-router-dom";

const STYLES = `
  .home-header {
    margin-bottom: 36px;
  }

  .home-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: #4ADE80;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .home-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #f8fafc;
    letter-spacing: -0.02em;
  }

  .home-subtitle {
    font-size: 13px;
    color: #64748b;
    margin-top: 6px;
  }

  .tools-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tool-card {
    background: #161b27;
    border: 1px solid #1e293b;
    border-radius: 10px;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    transition: border-color 0.15s, background 0.15s;
    cursor: pointer;
  }

  .tool-card:hover {
    border-color: #2d3f55;
    background: #1a2133;
  }

  .tool-info {}

  .tool-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }

  .tool-desc {
    font-size: 12px;
    color: #64748b;
  }

  .tool-arrow {
    font-size: 16px;
    color: #334155;
    transition: color 0.15s, transform 0.15s;
  }

  .tool-card:hover .tool-arrow {
    color: #4ADE80;
    transform: translateX(3px);
  }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 12px;
  }
`;

const TOOLS = [
  {
    path: "/queue",
    name: "Battle Card Queue",
    desc: "Pull undelivered battle card requests from Slack and copy them for Cowork.",
  },
];

export default function Home() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="home-header">
        <div className="home-eyebrow">Kin Sales</div>
        <div className="home-title">Internal Tools</div>
        <div className="home-subtitle">Operational utilities for the Kin Sales team.</div>
      </div>

      <div className="section-label">Tools</div>
      <div className="tools-grid">
        {TOOLS.map((tool) => (
          <Link to={tool.path} key={tool.path}>
            <div className="tool-card">
              <div className="tool-info">
                <div className="tool-name">{tool.name}</div>
                <div className="tool-desc">{tool.desc}</div>
              </div>
              <span className="tool-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

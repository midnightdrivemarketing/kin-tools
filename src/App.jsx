import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import "./global.css";
import Home from "./pages/Home";
import Queue from "./pages/Queue";

const NAV_STYLES = `
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .topbar {
    border-bottom: 1px solid #1e293b;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 32px;
    height: 52px;
    position: sticky;
    top: 0;
    background: #0F1117;
    z-index: 10;
  }

  .topbar-brand {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #4ADE80;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .topbar-divider {
    width: 1px;
    height: 20px;
    background: #1e293b;
  }

  .topbar-nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    padding: 5px 10px;
    border-radius: 5px;
    letter-spacing: 0.04em;
    transition: color 0.15s, background 0.15s;
    text-transform: uppercase;
  }

  .nav-link:hover {
    color: #94a3b8;
    background: #161b27;
  }

  .nav-link.active {
    color: #4ADE80;
    background: #052e16;
  }

  .page-content {
    flex: 1;
    padding: 40px 24px;
    max-width: 720px;
    margin: 0 auto;
    width: 100%;
  }
`;

export default function App() {
  return (
    <>
      <style>{NAV_STYLES}</style>
      <div className="layout">
        <nav className="topbar">
          <span className="topbar-brand">KIN TOOLS</span>
          <div className="topbar-divider" />
          <div className="topbar-nav">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/queue" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
              Queue
            </NavLink>
          </div>
        </nav>
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/queue" element={<Queue />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

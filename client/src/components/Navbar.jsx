import { Link, useLocation } from 'react-router-dom';
import { Zap, LayoutDashboard, PlusCircle } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <span className="brand-text">
            Validify<span className="brand-ai">AI</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="navbar-links">
          <Link
            to="/dashboard"
            className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link to="/submit" className="nav-link nav-link-cta">
            <PlusCircle size={16} />
            New Idea
          </Link>
        </div>
      </div>
    </nav>
  );
}

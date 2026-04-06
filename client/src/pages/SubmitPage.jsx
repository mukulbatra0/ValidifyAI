import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Lightbulb, Sparkles, ChevronRight } from 'lucide-react';
import { ideasAPI } from '../services/api.js';
import './SubmitPage.css';

const SAMPLE_IDEAS = [
  {
    title: 'AI-powered meal planner for dietitians',
    description: 'A SaaS tool that lets dietitians create personalized weekly meal plans for clients using AI, auto-generating shopping lists and nutritional breakdowns. Integrates with grocery delivery APIs.',
  },
  {
    title: 'Remote team water-cooler app',
    description: 'A Slack-integrated app that facilitates casual, spontaneous video calls between remote team members to replicate the water-cooler moments lost in remote work environments.',
  },
  {
    title: 'Micro-SaaS for freelance contract generation',
    description: 'A tool that lets freelancers input their service type, rate, and client details and auto-generates a legally-sound contract using AI, with e-signature support.',
  },
];

export default function SubmitPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSample = (sample) => {
    setForm(sample);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError('Both title and description are required.');
      return;
    }
    try {
      setLoading(true);
      const res = await ideasAPI.create(form);
      navigate(`/ideas/${res.data.data._id}`, { state: { fresh: true } });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="page submit-page">
      <div className="container">
        {/* Hero */}
        <div className="submit-hero fade-up">
          <span className="pill-tag">
            <Sparkles size={11} /> AI-Powered Analysis
          </span>
          <h1 className="mt-4 mb-4">
            Validate Your <span className="gradient-text">Startup Idea</span>
          </h1>
          <p className="submit-hero__sub">
            Describe your startup concept and receive an instant AI-generated
            report covering market opportunity, competitors, tech stack, and
            profitability potential.
          </p>
        </div>

        <div className="submit-layout">
          {/* Form */}
          <div className="submit-form-wrap glass-card fade-up stagger-2">
            <form onSubmit={handleSubmit} className="submit-form" id="idea-form">
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Startup Title
                </label>
                <input
                  id="title"
                  name="title"
                  className="form-input"
                  type="text"
                  placeholder="e.g. AI-powered meal planner for dietitians"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={120}
                  autoComplete="off"
                  disabled={loading}
                />
                <span className="char-count">{form.title.length}/120</span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  placeholder="Describe your idea in detail — the problem it solves, who it's for, and how it works…"
                  value={form.description}
                  onChange={handleChange}
                  maxLength={1500}
                  disabled={loading}
                />
                <span className="char-count">{form.description.length}/1500</span>
              </div>

              {error && (
                <div className="submit-error">
                  <span>⚠ {error}</span>
                </div>
              )}

              <button
                id="submit-btn"
                type="submit"
                className="btn btn-primary btn-lg w-full submit-btn"
                disabled={loading || !form.title.trim() || !form.description.trim()}
              >
                {loading ? (
                  <>
                    <span className="submit-spinner" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Analyze My Idea
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="submit-sidebar">
            {/* Sample ideas */}
            <div className="glass-card sidebar-card fade-up stagger-3">
              <div className="sidebar-card__header">
                <Lightbulb size={16} style={{ color: 'var(--accent-purple-light)' }} />
                <h4>Try a sample idea</h4>
              </div>
              <div className="sample-list">
                {SAMPLE_IDEAS.map((s, i) => (
                  <button
                    key={i}
                    id={`sample-idea-${i + 1}`}
                    className="sample-item"
                    onClick={() => handleSample(s)}
                    disabled={loading}
                    type="button"
                  >
                    <span>{s.title}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* What you'll get */}
            <div className="glass-card sidebar-card fade-up stagger-4">
              <div className="sidebar-card__header">
                <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
                <h4>What you'll get</h4>
              </div>
              <ul className="what-list">
                {[
                  'Problem summary',
                  'Customer persona',
                  'Market overview',
                  '3 key competitors',
                  'Suggested tech stack',
                  'Risk level assessment',
                  'Profitability score (0–100)',
                ].map((item, i) => (
                  <li key={i} className="what-item">
                    <span className="what-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

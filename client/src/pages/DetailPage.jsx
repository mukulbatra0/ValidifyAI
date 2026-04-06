import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Trash2,
  AlertCircle,
  Users,
  TrendingUp,
  Zap,
  Target,
  DollarSign,
} from 'lucide-react';
import { ideasAPI } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import ScoreGauge from '../components/ScoreGauge';
import ReportSection from '../components/ReportSection';
import './DetailPage.css';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    fetchIdea();
  }, [id]);

  useEffect(() => {
    if (idea?.status === 'analyzing' || idea?.status === 'pending') {
      setPolling(true);
      const interval = setInterval(fetchIdea, 3000);
      return () => clearInterval(interval);
    } else {
      setPolling(false);
    }
  }, [idea?.status]);

  const fetchIdea = async () => {
    try {
      const res = await ideasAPI.getById(id);
      setIdea(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load idea');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this idea?')) return;
    try {
      await ideasAPI.delete(id);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to delete idea');
    }
  };

  if (loading) {
    return (
      <main className="page detail-page">
        <div className="container">
          <div className="detail-loading">
            <div className="spinner" />
            <p>Loading idea...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !idea) {
    return (
      <main className="page detail-page">
        <div className="container">
          <div className="detail-error glass-card">
            <AlertCircle size={48} />
            <h3>Error</h3>
            <p>{error || 'Idea not found'}</p>
            <button className="btn btn-secondary mt-4" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  const { report } = idea;
  const isAnalyzing = idea.status === 'analyzing' || idea.status === 'pending';
  const hasError = idea.status === 'error';

  return (
    <main className="page detail-page">
      <div className="container">
        {/* Header */}
        <div className="detail-header fade-up">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
            Back
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            <Trash2 size={16} />
          </button>
        </div>

        {/* Title Card */}
        <div className="detail-title-card glass-card fade-up stagger-2">
          <div className="detail-title-top">
            <StatusBadge status={idea.status} />
            <div className="detail-date">
              <Calendar size={14} />
              {new Date(idea.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
          <h1 className="detail-title">{idea.title}</h1>
          <p className="detail-description">{idea.description}</p>
        </div>

        {/* Analyzing State */}
        {isAnalyzing && (
          <div className="detail-analyzing glass-card fade-up stagger-3">
            <div className="analyzing-spinner" />
            <h3>AI Analysis in Progress</h3>
            <p>Generating your comprehensive startup validation report...</p>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="detail-error-state glass-card fade-up stagger-3">
            <AlertCircle size={48} />
            <h3>Analysis Failed</h3>
            <p>{idea.errorMessage || 'Something went wrong during analysis'}</p>
          </div>
        )}

        {/* Report */}
        {idea.status === 'completed' && report && (
          <>
            {/* Score Overview */}
            <div className="detail-score-row fade-up stagger-3">
              <div className="glass-card score-card">
                <ScoreGauge score={report.profitability_score} size={140} />
                <div className="score-card-info">
                  <h3>Profitability Score</h3>
                  <p>{report.justification}</p>
                </div>
              </div>
              <div className="glass-card risk-card">
                <div className={`risk-badge risk-${report.risk_level?.toLowerCase()}`}>
                  {report.risk_level} Risk
                </div>
                <h3>Risk Assessment</h3>
                <p>
                  This idea has been assessed as {report.risk_level?.toLowerCase()} risk based on
                  market conditions, competition, and execution complexity.
                </p>
              </div>
            </div>

            {/* Report Sections */}
            <div className="detail-report fade-up stagger-4">
              <ReportSection
                icon={<Target size={20} />}
                title="Problem Summary"
                content={report.problem}
              />
              <ReportSection
                icon={<Users size={20} />}
                title="Customer Persona"
                content={report.customer}
              />
              <ReportSection
                icon={<TrendingUp size={20} />}
                title="Market Overview"
                content={report.market}
              />

              {/* Competitors */}
              {report.competitor && report.competitor.length > 0 && (
                <div className="glass-card report-section">
                  <div className="report-section-header">
                    <Zap size={20} style={{ color: 'var(--accent-purple-light)' }} />
                    <h3>Key Competitors</h3>
                  </div>
                  <div className="competitors-list">
                    {report.competitor.map((comp, i) => (
                      <div key={i} className="competitor-item">
                        <div className="competitor-name">{comp.name}</div>
                        <div className="competitor-diff">{comp.differentiation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {report.tech_stack && report.tech_stack.length > 0 && (
                <div className="glass-card report-section">
                  <div className="report-section-header">
                    <DollarSign size={20} style={{ color: 'var(--accent-cyan)' }} />
                    <h3>Suggested Tech Stack</h3>
                  </div>
                  <div className="tech-stack-list">
                    {report.tech_stack.map((tech, i) => (
                      <span key={i} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

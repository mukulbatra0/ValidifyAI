import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, ArrowRight, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import ScoreGauge from './ScoreGauge.jsx';
import './IdeaCard.css';

export default function IdeaCard({ idea, onDelete }) {
  const formattedDate = new Date(idea.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Delete "${idea.title}"? This cannot be undone.`)) {
      onDelete(idea._id);
    }
  };

  return (
    <div className="idea-card glass-card fade-up">
      {/* Top row */}
      <div className="idea-card__header">
        <StatusBadge status={idea.status} />
        <button
          className="idea-card__delete"
          onClick={handleDelete}
          aria-label="Delete idea"
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* Title & Description */}
      <h3 className="idea-card__title">{idea.title}</h3>
      <p className="idea-card__desc">
        {idea.description?.length > 110
          ? idea.description.slice(0, 110) + '…'
          : idea.description}
      </p>

      {/* Stats row */}
      <div className="idea-card__stats">
        {idea.status === 'completed' && idea.report && (
          <>
            <div className="idea-stat">
              <TrendingUp size={13} />
              <span
                className={`risk-txt risk-${idea.report?.risk_level?.toLowerCase()}`}
              >
                {idea.report?.risk_level} Risk
              </span>
            </div>
            <ScoreGauge
              score={idea.report?.profitability_score}
              size="sm"
            />
          </>
        )}
        <div className="idea-stat idea-stat--date">
          <Calendar size={13} />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* CTA */}
      <Link to={`/ideas/${idea._id}`} className="idea-card__cta">
        View Report
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

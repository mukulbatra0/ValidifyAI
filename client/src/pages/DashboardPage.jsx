import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Sparkles } from 'lucide-react';
import { ideasAPI } from '../services/api';
import IdeaCard from '../components/IdeaCard';
import './DashboardPage.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const res = await ideasAPI.getAll();
      setIdeas(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load ideas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this idea?')) return;
    try {
      await ideasAPI.delete(id);
      setIdeas(prev => prev.filter(idea => idea._id !== id));
    } catch (err) {
      alert('Failed to delete idea');
    }
  };

  return (
    <main className="page dashboard-page">
      <div className="container">
        <div className="dashboard-header fade-up">
          <div>
            <span className="pill-tag">
              <LayoutGrid size={11} /> Your Ideas
            </span>
            <h1 className="mt-4 mb-2">
              Idea <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="dashboard-header__sub">
              View all your validated startup ideas and their AI-generated reports
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/submit')}
          >
            <Sparkles size={16} />
            New Idea
          </button>
        </div>

        {loading && (
          <div className="dashboard-loading">
            <div className="spinner" />
            <p>Loading your ideas...</p>
          </div>
        )}

        {error && (
          <div className="dashboard-error glass-card">
            <p>⚠ {error}</p>
          </div>
        )}

        {!loading && !error && ideas.length === 0 && (
          <div className="dashboard-empty glass-card fade-up">
            <Sparkles size={48} style={{ color: 'var(--accent-purple-light)', opacity: 0.5 }} />
            <h3>No ideas yet</h3>
            <p>Submit your first startup idea to get started</p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate('/submit')}
            >
              Submit Idea
            </button>
          </div>
        )}

        {!loading && !error && ideas.length > 0 && (
          <div className="ideas-grid fade-up stagger-2">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea._id}
                idea={idea}
                onClick={() => navigate(`/ideas/${idea._id}`)}
                onDelete={() => handleDelete(idea._id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

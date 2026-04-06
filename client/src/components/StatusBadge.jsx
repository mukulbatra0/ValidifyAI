import { Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const STATUS_MAP = {
  pending:   { label: 'Pending',   icon: Clock,         cls: 'badge-pending'   },
  analyzing: { label: 'Analyzing', icon: Loader2,        cls: 'badge-analyzing' },
  completed: { label: 'Completed', icon: CheckCircle2,   cls: 'badge-completed' },
  error:     { label: 'Error',     icon: AlertCircle,    cls: 'badge-error'     },
};

export default function StatusBadge({ status }) {
  const config = STATUS_MAP[status] || STATUS_MAP.pending;
  const Icon = config.icon;

  return (
    <span className={`badge ${config.cls}`}>
      <span className={`status-dot ${status}`} />
      <Icon
        size={11}
        strokeWidth={2.5}
        style={status === 'analyzing' ? { animation: 'spin 1.2s linear infinite' } : {}}
      />
      {config.label}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}

import './ReportSection.css';

export default function ReportSection({ icon, title, content, children }) {
  return (
    <div className="report-section glass-card">
      <div className="report-section-header">
        {icon}
        <h3>{title}</h3>
      </div>
      <div className="report-section-content">
        {content || children}
      </div>
    </div>
  );
}

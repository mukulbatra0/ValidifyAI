import { useEffect, useRef } from 'react';
import './ScoreGauge.css';

const getColor = (score) => {
  if (score >= 70) return '#10b981';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
};

const getLabel = (score) => {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
};

export default function ScoreGauge({ score = 0, size = 'md' }) {
  const circleRef = useRef(null);
  const radius = size === 'sm' ? 18 : 38;
  const stroke = size === 'sm' ? 3.5 : 6;
  const circumference = 2 * Math.PI * radius;
  const color = getColor(score);
  const svgSize = (radius + stroke) * 2;

  useEffect(() => {
    if (circleRef.current) {
      const offset = circumference - (score / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset;
    }
  }, [score, circumference]);

  if (size === 'sm') {
    return (
      <div className="score-gauge score-gauge--sm" title={`Profitability: ${score}/100`}>
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
          <circle
            cx={svgSize / 2} cy={svgSize / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
          />
          <circle
            ref={circleRef}
            cx={svgSize / 2} cy={svgSize / 2} r={radius}
            fill="none" stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        <span className="score-gauge__num--sm" style={{ color }}>{score}</span>
      </div>
    );
  }

  return (
    <div className="score-gauge score-gauge--md">
      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <circle
          cx={svgSize / 2} cy={svgSize / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
        />
        <circle
          ref={circleRef}
          cx={svgSize / 2} cy={svgSize / 2} r={radius}
          fill="none" stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            filter: `drop-shadow(0 0 8px ${color}80)`,
          }}
        />
        <text
          x="50%" y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontSize="22"
          fontWeight="800"
          fontFamily="Inter, sans-serif"
        >
          {score}
        </text>
        <text
          x="50%" y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.4)"
          fontSize="9"
          fontWeight="500"
          fontFamily="Inter, sans-serif"
          letterSpacing="1"
        >
          /100
        </text>
      </svg>
      <div className="score-gauge__info">
        <p className="score-gauge__label">Profitability Score</p>
        <p className="score-gauge__sub" style={{ color }}>{getLabel(score)} Potential</p>
      </div>
    </div>
  );
}

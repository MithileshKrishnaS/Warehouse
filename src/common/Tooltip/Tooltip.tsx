import './Tooltip.css';

export function Tooltip({text}:{text: String}) {
  return (
    <div className="tooltip-container">
      <div className="tooltip-text">{text}</div>
    </div>
  );
};


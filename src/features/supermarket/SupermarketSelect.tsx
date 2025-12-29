
import React from 'react';
import './SupermarketSelect.css';

interface SupermarketSelectProps {
  supermarkets: string[];
  onSelect: (supermarket: string) => void;
}

const supermarketLogos: Record<string, string> = {
  'Tesco': '🔵',
  'M&S': '🟢',
  "Sainsbury's": '🟠',
};

const supermarketColors: Record<string, string> = {
  'Tesco': '#00539F',
  'M&S': '#005A2B',
  "Sainsbury's": '#F06C00',
};

function SupermarketSelect({ supermarkets, onSelect }: SupermarketSelectProps) {
  return (
    <div className="supermarket-select">
      <div className="step-indicator">Step 1 of 3</div>
      <h2>Where are you shopping today?</h2>
      <p className="subtitle">Select your supermarket to see available meal deal options</p>
      
      <div className="supermarket-grid">
        {supermarkets.map((supermarket) => (
          <button
            key={supermarket}
            className="supermarket-card"
            onClick={() => onSelect(supermarket)}
            style={{ '--accent-color': supermarketColors[supermarket] } as React.CSSProperties}
          >
            <span className="supermarket-logo">{supermarketLogos[supermarket]}</span>
            <span className="supermarket-name">{supermarket}</span>
            <span className="supermarket-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SupermarketSelect;

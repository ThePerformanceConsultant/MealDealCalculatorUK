
import React from 'react';
import { supermarkets, Supermarket } from '../../data/nutritionData';
import './SupermarketSelector.css';

interface SupermarketSelectorProps {
  selectedSupermarket: Supermarket | null;
  onSelect: (supermarket: Supermarket) => void;
}

const supermarketLogos: Record<Supermarket, string> = {
  "Tesco": "🔵",
  "M&S": "🟢",
  "Sainsbury's": "🟠"
};

export const SupermarketSelector: React.FC<SupermarketSelectorProps> = ({
  selectedSupermarket,
  onSelect
}) => {
  return (
    <div className="supermarket-selector">
      <h2>Where are you shopping today?</h2>
      <p className="subtitle">Select your supermarket to see available meal deal options</p>
      <div className="supermarket-grid">
        {supermarkets.map((supermarket) => (
          <button
            key={supermarket}
            className={`supermarket-card ${selectedSupermarket === supermarket ? 'selected' : ''}`}
            onClick={() => onSelect(supermarket)}
          >
            <span className="supermarket-icon">{supermarketLogos[supermarket]}</span>
            <span className="supermarket-name">{supermarket}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

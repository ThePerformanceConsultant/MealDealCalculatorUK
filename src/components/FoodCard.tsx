
import React from 'react';
import './FoodCard.css';
import { FoodItem } from '../data/foodData';

interface FoodCardProps {
  item: FoodItem;
  isSelected: boolean;
  onClick: () => void;
  highlight?: boolean;
}

function FoodCard({ item, isSelected, onClick, highlight }: FoodCardProps) {
  const proteinPerCalorie = (item.protein / item.calories) * 100;
  const isHighProtein = proteinPerCalorie >= 4;

  return (
    <div 
      className={`food-card ${isSelected ? 'selected' : ''} ${highlight ? 'highlight' : ''}`}
      onClick={onClick}
    >
      <div className="food-card-header">
        <h4 className="food-name">{item.name}</h4>
        {isHighProtein && <span className="protein-badge">High Protein</span>}
      </div>
      
      <div className="food-macros">
        <div className="macro-item calories">
          <span className="macro-value">{item.calories}</span>
          <span className="macro-label">kcal</span>
        </div>
        <div className="macro-item protein">
          <span className="macro-value">{item.protein.toFixed(1)}g</span>
          <span className="macro-label">Protein</span>
        </div>
        <div className="macro-item carbs">
          <span className="macro-value">{item.carbs.toFixed(1)}g</span>
          <span className="macro-label">Carbs</span>
        </div>
        <div className="macro-item fat">
          <span className="macro-value">{item.fat.toFixed(1)}g</span>
          <span className="macro-label">Fat</span>
        </div>
      </div>

      <div className="food-extras">
        {item.fiber > 0 && (
          <span className="extra-badge fiber">🌾 {item.fiber.toFixed(1)}g fiber</span>
        )}
        {item.sugar > 0 && (
          <span className="extra-badge sugar">🍬 {item.sugar.toFixed(1)}g sugar</span>
        )}
      </div>

      {isSelected && (
        <div className="selected-overlay">
          <span className="check-icon">✓</span>
          <span>Selected</span>
        </div>
      )}
    </div>
  );
}

export default FoodCard;

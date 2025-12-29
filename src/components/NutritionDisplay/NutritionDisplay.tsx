
import React from 'react';
import { FoodItem } from '../../data/nutritionData';
import './NutritionDisplay.css';

interface NutritionDisplayProps {
  item: FoodItem;
  compact?: boolean;
}

export const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ item, compact = false }) => {
  const macroTotal = item.protein + item.carbs + item.fat;
  const proteinPercent = (item.protein / macroTotal) * 100;
  const carbsPercent = (item.carbs / macroTotal) * 100;
  const fatPercent = (item.fat / macroTotal) * 100;

  if (compact) {
    return (
      <div className="nutrition-compact">
        <div className="macro-bar">
          <div className="protein-bar" style={{ width: `${proteinPercent}%` }} />
          <div className="carbs-bar" style={{ width: `${carbsPercent}%` }} />
          <div className="fat-bar" style={{ width: `${fatPercent}%` }} />
        </div>
        <div className="macro-legend">
          <span className="protein-legend">P: {item.protein}g</span>
          <span className="carbs-legend">C: {item.carbs}g</span>
          <span className="fat-legend">F: {item.fat}g</span>
        </div>
        {item.fiber > 0 && <div className="extra-info">Fiber: {item.fiber}g</div>}
        {item.sugar > 0 && <div className="extra-info">Sugar: {item.sugar}g</div>}
        <div className="extra-info">Sodium: {item.sodium}mg</div>
      </div>
    );
  }

  return (
    <div className="nutrition-display">
      <div className="nutrition-header">
        <h4>{item.name}</h4>
        <span className="total-calories">{item.calories} kcal</span>
      </div>
      
      <div className="macro-breakdown">
        <div className="macro-bar-large">
          <div className="protein-bar" style={{ width: `${proteinPercent}%` }} title={`Protein: ${proteinPercent.toFixed(0)}%`} />
          <div className="carbs-bar" style={{ width: `${carbsPercent}%` }} title={`Carbs: ${carbsPercent.toFixed(0)}%`} />
          <div className="fat-bar" style={{ width: `${fatPercent}%` }} title={`Fat: ${fatPercent.toFixed(0)}%`} />
        </div>
        
        <div className="macro-cards">
          <div className="macro-card protein">
            <span className="macro-value">{item.protein}g</span>
            <span className="macro-label">Protein</span>
            <span className="macro-percent">{proteinPercent.toFixed(0)}%</span>
          </div>
          <div className="macro-card carbs">
            <span className="macro-value">{item.carbs}g</span>
            <span className="macro-label">Carbs</span>
            <span className="macro-percent">{carbsPercent.toFixed(0)}%</span>
          </div>
          <div className="macro-card fat">
            <span className="macro-value">{item.fat}g</span>
            <span className="macro-label">Fat</span>
            <span className="macro-percent">{fatPercent.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="nutrition-details">
        <div className="detail-row">
          <span>Fiber</span>
          <span>{item.fiber}g</span>
        </div>
        <div className="detail-row">
          <span>Sugar</span>
          <span>{item.sugar}g</span>
        </div>
        <div className="detail-row">
          <span>Saturated Fat</span>
          <span>{item.saturatedFat}g</span>
        </div>
        <div className="detail-row">
          <span>Sodium</span>
          <span>{item.sodium}mg</span>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import './NutritionPreview.css';
import { FoodItem } from '../data/foodData';

interface NutritionPreviewProps {
  sandwich: FoodItem | null;
  snack: FoodItem | null;
  budget: number;
}

function NutritionPreview({ sandwich, snack, budget }: NutritionPreviewProps) {
  const totalCalories = (sandwich?.calories || 0) + (snack?.calories || 0);
  const totalProtein = (sandwich?.protein || 0) + (snack?.protein || 0);
  const totalCarbs = (sandwich?.carbs || 0) + (snack?.carbs || 0);
  const totalFat = (sandwich?.fat || 0) + (snack?.fat || 0);

  return (
    <div className="nutrition-preview">
      <div className="preview-title">
        <span className="preview-icon">📊</span>
        <span>Current Selection</span>
      </div>
      
      <div className="preview-stats">
        <div className="preview-stat main">
          <span className="stat-value">{totalCalories}</span>
          <span className="stat-label">kcal</span>
        </div>
        <div className="preview-stat protein">
          <span className="stat-value">{totalProtein.toFixed(1)}g</span>
          <span className="stat-label">Protein</span>
        </div>
        <div className="preview-stat carbs">
          <span className="stat-value">{totalCarbs.toFixed(1)}g</span>
          <span className="stat-label">Carbs</span>
        </div>
        <div className="preview-stat fat">
          <span className="stat-value">{totalFat.toFixed(1)}g</span>
          <span className="stat-label">Fat</span>
        </div>
      </div>

      <div className="preview-bar">
        <div 
          className="preview-fill"
          style={{ width: `${Math.min((totalCalories / budget) * 100, 100)}%` }}
        />
      </div>
      
      <div className="preview-remaining">
        {budget - totalCalories} kcal remaining
      </div>
    </div>
  );
}

export default NutritionPreview;

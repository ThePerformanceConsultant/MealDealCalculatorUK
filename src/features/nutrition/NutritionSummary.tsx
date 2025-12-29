
import React from 'react';
import './NutritionSummary.css';
import { FoodItem } from '../../data/foodData';

interface NutritionSummaryProps {
  sandwich: FoodItem | null;
  snack: FoodItem | null;
  caloriesBudget: number;
  onBack: () => void;
  onFullReset: () => void;
}

function NutritionSummary({ sandwich, snack, caloriesBudget, onBack, onFullReset }: NutritionSummaryProps) {
  const totalCalories = (sandwich?.calories || 0) + (snack?.calories || 0);
  const totalProtein = (sandwich?.protein || 0) + (snack?.protein || 0);
  const totalCarbs = (sandwich?.carbs || 0) + (snack?.carbs || 0);
  const totalFat = (sandwich?.fat || 0) + (snack?.fat || 0);
  const totalFiber = (sandwich?.fiber || 0) + (snack?.fiber || 0);
  const totalSugar = (sandwich?.sugar || 0) + (snack?.sugar || 0);
  const totalSodium = (sandwich?.sodium || 0) + (snack?.sodium || 0);
  const totalSaturatedFat = (sandwich?.saturatedFat || 0) + (snack?.saturatedFat || 0);

  const proteinCals = totalProtein * 4;
  const carbsCals = totalCarbs * 4;
  const fatCals = totalFat * 9;

  const proteinPercent = Math.round((proteinCals / totalCalories) * 100) || 0;
  const carbsPercent = Math.round((carbsCals / totalCalories) * 100) || 0;
  const fatPercent = Math.round((fatCals / totalCalories) * 100) || 0;

  const getProteinRating = () => {
    if (totalProtein >= 35) return { label: 'Excellent', color: '#22c55e', emoji: '💪' };
    if (totalProtein >= 25) return { label: 'Good', color: '#84cc16', emoji: '👍' };
    if (totalProtein >= 15) return { label: 'Moderate', color: '#eab308', emoji: '👌' };
    return { label: 'Low', color: '#ef4444', emoji: '⚠️' };
  };

  const proteinRating = getProteinRating();

  return (
    <div className="nutrition-summary">
      <div className="summary-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Selection
        </button>
        <h2>Your Meal Summary</h2>
        <button className="new-meal-btn" onClick={onFullReset}>
          Start New Meal
        </button>
      </div>

      <div className="summary-content">
        <div className="selected-items">
          <div className="selected-item-card">
            <span className="item-emoji">🥪</span>
            <div className="item-details">
              <span className="item-label">Sandwich</span>
              <span className="item-name">{sandwich?.name || 'Not selected'}</span>
              {sandwich && <span className="item-cals">{sandwich.calories} kcal</span>}
            </div>
          </div>
          <span className="plus-sign">+</span>
          <div className="selected-item-card">
            <span className="item-emoji">🍎</span>
            <div className="item-details">
              <span className="item-label">Snack</span>
              <span className="item-name">{snack?.name || 'Not selected'}</span>
              {snack && <span className="item-cals">{snack.calories} kcal</span>}
            </div>
          </div>
        </div>

        <div className="calorie-summary">
          <div className="calorie-circle">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(totalCalories / caloriesBudget) * 283} 283`}
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="calorie-text">
              <span className="cal-value">{totalCalories}</span>
              <span className="cal-label">kcal</span>
            </div>
          </div>
          <div className="calorie-info">
            <p>Budget: <strong>{caloriesBudget} kcal</strong></p>
            <p>Used: <strong>{totalCalories} kcal</strong></p>
            <p className="remaining">Remaining: <strong>{caloriesBudget - totalCalories} kcal</strong></p>
          </div>
        </div>

        <div className="macro-breakdown">
          <h3>Macronutrient Breakdown</h3>
          
          <div className="macro-bar">
            <div className="macro-segment protein" style={{ width: `${proteinPercent}%` }}>
              {proteinPercent > 10 && `${proteinPercent}%`}
            </div>
            <div className="macro-segment carbs" style={{ width: `${carbsPercent}%` }}>
              {carbsPercent > 10 && `${carbsPercent}%`}
            </div>
            <div className="macro-segment fat" style={{ width: `${fatPercent}%` }}>
              {fatPercent > 10 && `${fatPercent}%`}
            </div>
          </div>

          <div className="macro-legend">
            <div className="legend-item">
              <span className="legend-color protein"></span>
              <span className="legend-label">Protein</span>
              <span className="legend-value">{totalProtein.toFixed(1)}g</span>
            </div>
            <div className="legend-item">
              <span className="legend-color carbs"></span>
              <span className="legend-label">Carbs</span>
              <span className="legend-value">{totalCarbs.toFixed(1)}g</span>
            </div>
            <div className="legend-item">
              <span className="legend-color fat"></span>
              <span className="legend-label">Fat</span>
              <span className="legend-value">{totalFat.toFixed(1)}g</span>
            </div>
          </div>
        </div>

        <div className="protein-highlight" style={{ borderColor: proteinRating.color }}>
          <div className="highlight-header">
            <span className="highlight-emoji">{proteinRating.emoji}</span>
            <div>
              <span className="highlight-label">Protein Score</span>
              <span className="highlight-rating" style={{ color: proteinRating.color }}>
                {proteinRating.label}
              </span>
            </div>
          </div>
          <p className="highlight-value">{totalProtein.toFixed(1)}g protein</p>
          <p className="highlight-info">
            {totalProtein >= 25 
              ? "Great job! This meal provides excellent protein for muscle maintenance and satiety."
              : "Consider choosing higher-protein options for better satiety and muscle support."}
          </p>
        </div>

        <div className="detailed-nutrition">
          <h3>Detailed Nutrition</h3>
          
          <div className="nutrition-grid">
            <div className="nutrition-row header">
              <span>Nutrient</span>
              <span>Sandwich</span>
              <span>Snack</span>
              <span>Total</span>
            </div>
            
            <div className="nutrition-row">
              <span>Calories</span>
              <span>{sandwich?.calories || '-'}</span>
              <span>{snack?.calories || '-'}</span>
              <span className="total">{totalCalories} kcal</span>
            </div>
            
            <div className="nutrition-row highlight-row">
              <span>Protein</span>
              <span>{sandwich?.protein || '-'}g</span>
              <span>{snack?.protein || '-'}g</span>
              <span className="total">{totalProtein.toFixed(1)}g</span>
            </div>
            
            <div className="nutrition-row">
              <span>Carbohydrates</span>
              <span>{sandwich?.carbs || '-'}g</span>
              <span>{snack?.carbs || '-'}g</span>
              <span className="total">{totalCarbs.toFixed(1)}g</span>
            </div>
            
            <div className="nutrition-row">
              <span>Fat</span>
              <span>{sandwich?.fat || '-'}g</span>
              <span>{snack?.fat || '-'}g</span>
              <span className="total">{totalFat.toFixed(1)}g</span>
            </div>
            
            <div className="nutrition-row">
              <span>Saturated Fat</span>
              <span>{sandwich?.saturatedFat || '-'}g</span>
              <span>{snack?.saturatedFat || '-'}g</span>
              <span className="total">{totalSaturatedFat.toFixed(1)}g</span>
            </div>
            
            <div className="nutrition-row">
              <span>Fiber</span>
              <span>{sandwich?.fiber || '-'}g</span>
              <span>{snack?.fiber || '-'}g</span>
              <span className="total">{totalFiber.toFixed(1)}g</span>
            </div>
            
            <div className="nutrition-row">
              <span>Sugar</span>
              <span>{sandwich?.sugar || '-'}g</span>
              <span>{snack?.sugar || '-'}g</span>
              <span className="total">{totalSugar.toFixed(1)}g</span>
            </div>
            
            <div className="nutrition-row">
              <span>Sodium</span>
              <span>{sandwich?.sodium || '-'}mg</span>
              <span>{snack?.sodium || '-'}mg</span>
              <span className="total">{totalSodium.toFixed(0)}mg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionSummary;

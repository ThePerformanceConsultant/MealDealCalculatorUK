
import React from 'react';
import { FoodItem } from '../../data/nutritionData';
import './MealSummary.css';

interface MealSummaryProps {
  sandwich: FoodItem | null;
  snack: FoodItem | null;
  caloriesBudget: number;
  onReset: () => void;
}

export const MealSummary: React.FC<MealSummaryProps> = ({
  sandwich,
  snack,
  caloriesBudget,
  onReset
}) => {
  const totalCalories = (sandwich?.calories || 0) + (snack?.calories || 0);
  const totalProtein = (sandwich?.protein || 0) + (snack?.protein || 0);
  const totalCarbs = (sandwich?.carbs || 0) + (snack?.carbs || 0);
  const totalFat = (sandwich?.fat || 0) + (snack?.fat || 0);
  const totalFiber = (sandwich?.fiber || 0) + (snack?.fiber || 0);
  const totalSugar = (sandwich?.sugar || 0) + (snack?.sugar || 0);
  const totalSodium = (sandwich?.sodium || 0) + (snack?.sodium || 0);

  const remainingCalories = caloriesBudget - totalCalories;
  const macroTotal = totalProtein + totalCarbs + totalFat;

  const isComplete = sandwich && snack;

  return (
    <div className="meal-summary">
      <div className="summary-header">
        <h3>Your Meal Deal</h3>
        <button className="reset-btn" onClick={onReset}>
          Reset Selection
        </button>
      </div>

      <div className="budget-progress">
        <div className="budget-bar">
          <div 
            className="budget-fill" 
            style={{ 
              width: `${Math.min((totalCalories / caloriesBudget) * 100, 100)}%`,
              background: remainingCalories < 0 ? '#ef4444' : '#10b981'
            }} 
          />
        </div>
        <div className="budget-info">
          <span className="used">{totalCalories} kcal used</span>
          <span className={`remaining ${remainingCalories < 0 ? 'over' : ''}`}>
            {remainingCalories >= 0 ? `${remainingCalories} kcal remaining` : `${Math.abs(remainingCalories)} kcal over`}
          </span>
        </div>
      </div>

      <div className="selected-items">
        <div className={`item-slot ${sandwich ? 'filled' : ''}`}>
          <span className="slot-icon">🥪</span>
          <div className="slot-content">
            <span className="slot-label">Sandwich</span>
            {sandwich ? (
              <>
                <span className="slot-name">{sandwich.name}</span>
                <span className="slot-calories">{sandwich.calories} kcal</span>
              </>
            ) : (
              <span className="slot-empty">Select a sandwich</span>
            )}
          </div>
        </div>

        <div className={`item-slot ${snack ? 'filled' : ''}`}>
          <span className="slot-icon">🍎</span>
          <div className="slot-content">
            <span className="slot-label">Snack</span>
            {snack ? (
              <>
                <span className="slot-name">{snack.name}</span>
                <span className="slot-calories">{snack.calories} kcal</span>
              </>
            ) : (
              <span className="slot-empty">Select a snack</span>
            )}
          </div>
        </div>
      </div>

      {isComplete && (
        <div className="total-nutrition">
          <h4>Total Nutrition</h4>
          
          <div className="total-macro-bar">
            <div 
              className="protein-segment" 
              style={{ width: `${(totalProtein / macroTotal) * 100}%` }} 
            />
            <div 
              className="carbs-segment" 
              style={{ width: `${(totalCarbs / macroTotal) * 100}%` }} 
            />
            <div 
              className="fat-segment" 
              style={{ width: `${(totalFat / macroTotal) * 100}%` }} 
            />
          </div>

          <div className="total-macros">
            <div className="total-macro protein">
              <span className="macro-icon">💪</span>
              <div className="macro-info">
                <span className="macro-amount">{totalProtein.toFixed(1)}g</span>
                <span className="macro-name">Protein</span>
              </div>
            </div>
            <div className="total-macro carbs">
              <span className="macro-icon">⚡</span>
              <div className="macro-info">
                <span className="macro-amount">{totalCarbs.toFixed(1)}g</span>
                <span className="macro-name">Carbs</span>
              </div>
            </div>
            <div className="total-macro fat">
              <span className="macro-icon">🫒</span>
              <div className="macro-info">
                <span className="macro-amount">{totalFat.toFixed(1)}g</span>
                <span className="macro-name">Fat</span>
              </div>
            </div>
          </div>

          <div className="additional-stats">
            <div className="stat">
              <span className="stat-label">Fiber</span>
              <span className="stat-value">{totalFiber.toFixed(1)}g</span>
            </div>
            <div className="stat">
              <span className="stat-label">Sugar</span>
              <span className="stat-value">{totalSugar.toFixed(1)}g</span>
            </div>
            <div className="stat">
              <span className="stat-label">Sodium</span>
              <span className="stat-value">{totalSodium}mg</span>
            </div>
          </div>

          <div className="protein-highlight">
            <span className="highlight-label">🎯 Protein per calorie:</span>
            <span className="highlight-value">
              {(totalProtein / totalCalories * 100).toFixed(1)}g per 100kcal
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

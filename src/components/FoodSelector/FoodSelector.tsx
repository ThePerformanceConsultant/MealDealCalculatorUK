
import React, { useState } from 'react';
import { FoodItem } from '../../data/nutritionData';
import { NutritionDisplay } from '../NutritionDisplay/NutritionDisplay';
import './FoodSelector.css';

interface FoodSelectorProps {
  title: string;
  items: FoodItem[];
  selectedItem: FoodItem | null;
  onSelect: (item: FoodItem | null) => void;
  maxCalories: number;
  disabled?: boolean;
}

export const FoodSelector: React.FC<FoodSelectorProps> = ({
  title,
  items,
  selectedItem,
  onSelect,
  maxCalories,
  disabled = false
}) => {
  const [sortBy, setSortBy] = useState<'calories' | 'protein' | 'name'>('calories');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const availableItems = items.filter(item => item.calories <= maxCalories);
  const unavailableItems = items.filter(item => item.calories > maxCalories);

  const sortItems = (itemsToSort: FoodItem[]) => {
    return [...itemsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'calories':
          return a.calories - b.calories;
        case 'protein':
          return b.protein - a.protein;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  };

  const getProteinRating = (protein: number): 'high' | 'medium' | 'low' => {
    if (protein >= 25) return 'high';
    if (protein >= 15) return 'medium';
    return 'low';
  };

  return (
    <div className={`food-selector ${disabled ? 'disabled' : ''}`}>
      <div className="selector-header">
        <h3>{title}</h3>
        <div className="sort-options">
          <span>Sort by:</span>
          <button 
            className={sortBy === 'calories' ? 'active' : ''}
            onClick={() => setSortBy('calories')}
          >
            Calories
          </button>
          <button 
            className={sortBy === 'protein' ? 'active' : ''}
            onClick={() => setSortBy('protein')}
          >
            Protein
          </button>
          <button 
            className={sortBy === 'name' ? 'active' : ''}
            onClick={() => setSortBy('name')}
          >
            Name
          </button>
        </div>
      </div>

      <div className="budget-indicator">
        <span>Budget: {maxCalories} kcal</span>
        <span className="available-count">{availableItems.length} options available</span>
      </div>

      {selectedItem && (
        <div className="selected-item-banner">
          <div className="selected-info">
            <span className="selected-label">Selected:</span>
            <span className="selected-name">{selectedItem.name}</span>
            <span className="selected-calories">{selectedItem.calories} kcal</span>
          </div>
          <button className="clear-btn" onClick={() => onSelect(null)}>
            Change
          </button>
        </div>
      )}

      <div className="items-grid">
        {sortItems(availableItems).map((item) => (
          <div
            key={item.name}
            className={`food-card ${selectedItem?.name === item.name ? 'selected' : ''}`}
            onClick={() => !disabled && onSelect(item)}
          >
            <div className="food-card-header">
              <span className={`protein-badge ${getProteinRating(item.protein)}`}>
                {item.protein}g protein
              </span>
              <span className="calorie-badge">{item.calories} kcal</span>
            </div>
            <h4 className="food-name">{item.name}</h4>
            <div className="quick-stats">
              <span>C: {item.carbs}g</span>
              <span>F: {item.fat}g</span>
            </div>
            <button 
              className="details-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(showDetails === item.name ? null : item.name);
              }}
            >
              {showDetails === item.name ? 'Hide details' : 'Show details'}
            </button>
            {showDetails === item.name && (
              <div className="food-details">
                <NutritionDisplay item={item} compact />
              </div>
            )}
          </div>
        ))}
      </div>

      {unavailableItems.length > 0 && (
        <div className="unavailable-section">
          <h4>Over budget ({unavailableItems.length} items)</h4>
          <div className="unavailable-items">
            {sortItems(unavailableItems).slice(0, 5).map((item) => (
              <div key={item.name} className="unavailable-item">
                <span className="unavailable-name">{item.name}</span>
                <span className="unavailable-calories">{item.calories} kcal</span>
              </div>
            ))}
            {unavailableItems.length > 5 && (
              <span className="more-items">+{unavailableItems.length - 5} more</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

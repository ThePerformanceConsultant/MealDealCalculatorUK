
import React, { useState, useMemo } from 'react';
import './MealSelector.css';
import { FoodItem, getSandwiches, getSnacks } from '../../data/foodData';
import FoodCard from '../../components/FoodCard';
import NutritionPreview from '../../components/NutritionPreview';

interface MealSelectorProps {
  supermarket: string;
  caloriesBudget: number;
  foodData: FoodItem[];
  selectedSandwich: FoodItem | null;
  selectedSnack: FoodItem | null;
  onSandwichSelect: (item: FoodItem | null) => void;
  onSnackSelect: (item: FoodItem | null) => void;
  onReset: () => void;
  onFullReset: () => void;
  onViewSummary: () => void;
}

type SortOption = 'calories' | 'protein' | 'name';

function MealSelector({
  supermarket,
  caloriesBudget,
  selectedSandwich,
  selectedSnack,
  onSandwichSelect,
  onSnackSelect,
  onReset,
  onFullReset,
  onViewSummary,
}: MealSelectorProps) {
  const [sandwichSort, setSandwichSort] = useState<SortOption>('protein');
  const [snackSort, setSnackSort] = useState<SortOption>('protein');
  const [sandwichSearch, setSandwichSearch] = useState('');
  const [snackSearch, setSnackSearch] = useState('');

  const allSandwiches = useMemo(() => getSandwiches(supermarket), [supermarket]);
  const allSnacks = useMemo(() => getSnacks(supermarket), [supermarket]);

  const remainingAfterSandwich = selectedSandwich 
    ? caloriesBudget - selectedSandwich.calories 
    : caloriesBudget;

  const remainingAfterSnack = selectedSnack
    ? caloriesBudget - selectedSnack.calories
    : caloriesBudget;

  const sortItems = (items: FoodItem[], sortBy: SortOption): FoodItem[] => {
    return [...items].sort((a, b) => {
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

  const filterBySearch = (items: FoodItem[], search: string): FoodItem[] => {
    if (!search.trim()) return items;
    const lower = search.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(lower));
  };

  const availableSandwiches = useMemo(() => {
    let items = allSandwiches.filter(s => s.calories <= remainingAfterSnack);
    items = filterBySearch(items, sandwichSearch);
    return sortItems(items, sandwichSort);
  }, [allSandwiches, remainingAfterSnack, sandwichSort, sandwichSearch]);

  const availableSnacks = useMemo(() => {
    let items = allSnacks.filter(s => s.calories <= remainingAfterSandwich);
    items = filterBySearch(items, snackSearch);
    return sortItems(items, snackSort);
  }, [allSnacks, remainingAfterSandwich, snackSort, snackSearch]);

  const totalCalories = (selectedSandwich?.calories || 0) + (selectedSnack?.calories || 0);
  const remainingCalories = caloriesBudget - totalCalories;
  const isComplete = selectedSandwich && selectedSnack;

  return (
    <div className="meal-selector">
      <div className="selector-header">
        <div className="header-left">
          <button className="back-btn" onClick={onFullReset}>
            ← Start Over
          </button>
          <div className="step-indicator">Step 3 of 3</div>
        </div>
        
        <div className="budget-display">
          <div className="budget-bar">
            <div 
              className="budget-fill"
              style={{ width: `${Math.min((totalCalories / caloriesBudget) * 100, 100)}%` }}
            />
          </div>
          <div className="budget-text">
            <span className="budget-used">{totalCalories}</span>
            <span className="budget-separator">/</span>
            <span className="budget-total">{caloriesBudget} kcal</span>
            <span className={`budget-remaining ${remainingCalories < 0 ? 'over' : ''}`}>
              ({remainingCalories >= 0 ? `${remainingCalories} remaining` : `${Math.abs(remainingCalories)} over`})
            </span>
          </div>
        </div>

        <button className="reset-btn" onClick={onReset}>
          🔄 Reset Selection
        </button>
      </div>

      {(selectedSandwich || selectedSnack) && (
        <NutritionPreview 
          sandwich={selectedSandwich} 
          snack={selectedSnack}
          budget={caloriesBudget}
        />
      )}

      <div className="selector-grid">
        <div className="selector-column">
          <div className="column-header">
            <h3>🥪 Choose Your Sandwich</h3>
            <div className="column-controls">
              <input
                type="text"
                placeholder="Search..."
                value={sandwichSearch}
                onChange={(e) => setSandwichSearch(e.target.value)}
                className="search-input"
              />
              <select 
                value={sandwichSort} 
                onChange={(e) => setSandwichSort(e.target.value as SortOption)}
                className="sort-select"
              >
                <option value="protein">High Protein</option>
                <option value="calories">Low Calorie</option>
                <option value="name">A-Z</option>
              </select>
            </div>
          </div>

          {selectedSandwich ? (
            <div className="selected-item">
              <FoodCard 
                item={selectedSandwich} 
                isSelected={true}
                onClick={() => onSandwichSelect(null)}
              />
              <button className="change-btn" onClick={() => onSandwichSelect(null)}>
                Change Selection
              </button>
            </div>
          ) : (
            <div className="food-list">
              {availableSandwiches.length === 0 ? (
                <div className="no-items">
                  <span className="no-items-icon">😔</span>
                  <p>No sandwiches fit your remaining budget</p>
                  <p className="no-items-hint">Try selecting a lower-calorie snack first, or reset your selection</p>
                </div>
              ) : (
                availableSandwiches.map((item) => (
                  <FoodCard
                    key={item.name}
                    item={item}
                    isSelected={false}
                    onClick={() => onSandwichSelect(item)}
                    highlight={item.protein >= 25}
                  />
                ))
              )}
            </div>
          )}
        </div>

        <div className="selector-column">
          <div className="column-header">
            <h3>🍎 Choose Your Snack</h3>
            <div className="column-controls">
              <input
                type="text"
                placeholder="Search..."
                value={snackSearch}
                onChange={(e) => setSnackSearch(e.target.value)}
                className="search-input"
              />
              <select 
                value={snackSort} 
                onChange={(e) => setSnackSort(e.target.value as SortOption)}
                className="sort-select"
              >
                <option value="protein">High Protein</option>
                <option value="calories">Low Calorie</option>
                <option value="name">A-Z</option>
              </select>
            </div>
          </div>

          {selectedSnack ? (
            <div className="selected-item">
              <FoodCard 
                item={selectedSnack} 
                isSelected={true}
                onClick={() => onSnackSelect(null)}
              />
              <button className="change-btn" onClick={() => onSnackSelect(null)}>
                Change Selection
              </button>
            </div>
          ) : (
            <div className="food-list">
              {availableSnacks.length === 0 ? (
                <div className="no-items">
                  <span className="no-items-icon">😔</span>
                  <p>No snacks fit your remaining budget</p>
                  <p className="no-items-hint">Try selecting a lower-calorie sandwich first, or reset your selection</p>
                </div>
              ) : (
                availableSnacks.map((item) => (
                  <FoodCard
                    key={item.name}
                    item={item}
                    isSelected={false}
                    onClick={() => onSnackSelect(item)}
                    highlight={item.protein >= 10}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {isComplete && (
        <div className="complete-banner">
          <div className="complete-content">
            <span className="complete-icon">✅</span>
            <div className="complete-text">
              <strong>Meal Complete!</strong>
              <span>{totalCalories} kcal total • {remainingCalories} under budget</span>
            </div>
          </div>
          <button className="view-summary-btn" onClick={onViewSummary}>
            View Full Nutrition Summary →
          </button>
        </div>
      )}
    </div>
  );
}

export default MealSelector;

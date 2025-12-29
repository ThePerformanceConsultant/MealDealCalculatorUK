
import React, { useState, useEffect } from 'react';
import { SupermarketSelector } from './components/SupermarketSelector/SupermarketSelector';
import { CalorieCalculator } from './components/CalorieCalculator/CalorieCalculator';
import { FoodSelector } from './components/FoodSelector/FoodSelector';
import { MealSummary } from './components/MealSummary/MealSummary';
import { NutritionEducation } from './components/NutritionEducation/NutritionEducation';
import { ProgressSteps } from './components/ProgressSteps/ProgressSteps';
import { FoodItem, Supermarket, getSandwiches, getSnacks } from './data/nutritionData';
import './App.css';

const steps = [
  { id: 1, label: 'Store', icon: '🏪' },
  { id: 2, label: 'Budget', icon: '🎯' },
  { id: 3, label: 'Sandwich', icon: '🥪' },
  { id: 4, label: 'Snack', icon: '🍎' },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSupermarket, setSelectedSupermarket] = useState<Supermarket | null>(null);
  const [caloriesBudget, setCaloriesBudget] = useState<number | null>(null);
  const [selectedSandwich, setSelectedSandwich] = useState<FoodItem | null>(null);
  const [selectedSnack, setSelectedSnack] = useState<FoodItem | null>(null);
  const [showEducation, setShowEducation] = useState(false);

  const handleSupermarketSelect = (supermarket: Supermarket) => {
    setSelectedSupermarket(supermarket);
    setCurrentStep(2);
  };

  const handleCaloriesSet = (calories: number) => {
    setCaloriesBudget(calories);
    setCurrentStep(3);
  };

  const handleSandwichSelect = (sandwich: FoodItem | null) => {
    setSelectedSandwich(sandwich);
    if (sandwich) {
      setCurrentStep(4);
    }
  };

  const handleSnackSelect = (snack: FoodItem | null) => {
    setSelectedSnack(snack);
  };

  const handleReset = () => {
    setSelectedSandwich(null);
    setSelectedSnack(null);
    setCurrentStep(3);
  };

  const handleFullReset = () => {
    setCurrentStep(1);
    setSelectedSupermarket(null);
    setCaloriesBudget(null);
    setSelectedSandwich(null);
    setSelectedSnack(null);
  };

  const getRemainingBudget = () => {
    if (!caloriesBudget) return 0;
    const sandwichCals = selectedSandwich?.calories || 0;
    return caloriesBudget - sandwichCals;
  };

  const sandwiches = selectedSupermarket ? getSandwiches(selectedSupermarket) : [];
  const snacks = selectedSupermarket ? getSnacks(selectedSupermarket) : [];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🥗 Meal Deal Macro Tracker</h1>
          <p>Build your perfect meal deal within your calorie budget</p>
        </div>
        {currentStep > 1 && (
          <button className="start-over-btn" onClick={handleFullReset}>
            Start Over
          </button>
        )}
      </header>

      <main className="app-main">
        <ProgressSteps currentStep={currentStep} steps={steps} />

        {currentStep === 1 && (
          <SupermarketSelector
            selectedSupermarket={selectedSupermarket}
            onSelect={handleSupermarketSelect}
          />
        )}

        {currentStep === 2 && (
          <CalorieCalculator
            onCaloriesSet={handleCaloriesSet}
            currentCalories={caloriesBudget}
          />
        )}

        {currentStep >= 3 && caloriesBudget && (
          <div className="meal-builder">
            <div className="food-selectors">
              <FoodSelector
                title="Choose Your Sandwich"
                items={sandwiches}
                selectedItem={selectedSandwich}
                onSelect={handleSandwichSelect}
                maxCalories={caloriesBudget}
              />

              <FoodSelector
                title="Choose Your Snack"
                items={snacks}
                selectedItem={selectedSnack}
                onSelect={handleSnackSelect}
                maxCalories={getRemainingBudget()}
                disabled={!selectedSandwich}
              />
            </div>

            <aside className="meal-summary-sidebar">
              <MealSummary
                sandwich={selectedSandwich}
                snack={selectedSnack}
                caloriesBudget={caloriesBudget}
                onReset={handleReset}
              />
            </aside>
          </div>
        )}

        <div className="education-toggle">
          <button
            className="toggle-education-btn"
            onClick={() => setShowEducation(!showEducation)}
          >
            {showEducation ? '📖 Hide' : '📚 Learn'} About Nutrition
          </button>
        </div>

        {showEducation && <NutritionEducation />}
      </main>

      <footer className="app-footer">
        <p>Built to help you make smarter meal choices 💪</p>
      </footer>
    </div>
  );
}

export default App;

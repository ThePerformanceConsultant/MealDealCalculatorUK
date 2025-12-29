
import React, { useState } from 'react';
import './App.css';
import SupermarketSelect from './features/supermarket/SupermarketSelect';
import CalorieSetup from './features/calories/CalorieSetup';
import MealSelector from './features/meal/MealSelector';
import NutritionSummary from './features/nutrition/NutritionSummary';
import EducationPanel from './features/education/EducationPanel';
import { FoodItem, foodData, supermarkets } from './data/foodData';

export type AppStep = 'supermarket' | 'calories' | 'selection' | 'summary';

function App() {
  const [step, setStep] = useState<AppStep>('supermarket');
  const [selectedSupermarket, setSelectedSupermarket] = useState<string>('');
  const [caloriesBudget, setCaloriesBudget] = useState<number>(0);
  const [selectedSandwich, setSelectedSandwich] = useState<FoodItem | null>(null);
  const [selectedSnack, setSelectedSnack] = useState<FoodItem | null>(null);
  const [showEducation, setShowEducation] = useState(false);

  const handleSupermarketSelect = (supermarket: string) => {
    setSelectedSupermarket(supermarket);
    setStep('calories');
  };

  const handleCaloriesSet = (calories: number) => {
    setCaloriesBudget(calories);
    setStep('selection');
  };

  const handleReset = () => {
    setSelectedSandwich(null);
    setSelectedSnack(null);
  };

  const handleFullReset = () => {
    setStep('supermarket');
    setSelectedSupermarket('');
    setCaloriesBudget(0);
    setSelectedSandwich(null);
    setSelectedSnack(null);
  };

  const handleViewSummary = () => {
    setStep('summary');
  };

  const handleBackToSelection = () => {
    setStep('selection');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🥗 Smart Meal Deal</h1>
          <p className="tagline">Make nutrition-conscious choices, effortlessly</p>
        </div>
        <button 
          className="education-toggle"
          onClick={() => setShowEducation(!showEducation)}
        >
          {showEducation ? '✕ Close Guide' : '📚 Nutrition Guide'}
        </button>
      </header>

      {showEducation && (
        <EducationPanel onClose={() => setShowEducation(false)} />
      )}

      <main className="app-main">
        {step === 'supermarket' && (
          <SupermarketSelect 
            supermarkets={supermarkets}
            onSelect={handleSupermarketSelect}
          />
        )}

        {step === 'calories' && (
          <CalorieSetup 
            onCaloriesSet={handleCaloriesSet}
            onBack={() => setStep('supermarket')}
          />
        )}

        {step === 'selection' && (
          <MealSelector
            supermarket={selectedSupermarket}
            caloriesBudget={caloriesBudget}
            foodData={foodData}
            selectedSandwich={selectedSandwich}
            selectedSnack={selectedSnack}
            onSandwichSelect={setSelectedSandwich}
            onSnackSelect={setSelectedSnack}
            onReset={handleReset}
            onFullReset={handleFullReset}
            onViewSummary={handleViewSummary}
          />
        )}

        {step === 'summary' && (
          <NutritionSummary
            sandwich={selectedSandwich}
            snack={selectedSnack}
            caloriesBudget={caloriesBudget}
            onBack={handleBackToSelection}
            onFullReset={handleFullReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Build better habits, one meal at a time 💪</p>
      </footer>
    </div>
  );
}

export default App;

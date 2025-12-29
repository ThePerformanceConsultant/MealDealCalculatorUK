
import React, { useState } from 'react';
import './CalorieCalculator.css';

interface CalorieCalculatorProps {
  onCaloriesSet: (calories: number) => void;
  currentCalories: number | null;
}

type Gender = 'male' | 'female';

const activityLevels = [
  { value: 1.2, label: 'Sedentary', description: 'Little or no exercise' },
  { value: 1.375, label: 'Light', description: 'Light exercise 1-3 days/week' },
  { value: 1.55, label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
  { value: 1.725, label: 'Active', description: 'Hard exercise 6-7 days/week' },
  { value: 1.9, label: 'Very Active', description: 'Very hard exercise & physical job' },
];

export const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({
  onCaloriesSet,
  currentCalories
}) => {
  const [mode, setMode] = useState<'manual' | 'calculate'>('manual');
  const [manualCalories, setManualCalories] = useState(currentCalories?.toString() || '500');
  
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<Gender>('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [mealsPerDay, setMealsPerDay] = useState('3');
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null);

  const calculateBMR = (): number => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    if (gender === 'male') {
      return 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      return 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }
  };

  const handleCalculate = () => {
    const bmr = calculateBMR();
    const tdee = bmr * activityLevel;
    const meals = parseInt(mealsPerDay) || 3;
    const mealCalories = Math.round((tdee / meals) * 0.95);
    setCalculatedCalories(mealCalories);
    onCaloriesSet(mealCalories);
  };

  const handleManualSet = () => {
    const calories = parseInt(manualCalories);
    if (calories > 0) {
      onCaloriesSet(calories);
    }
  };

  return (
    <div className="calorie-calculator">
      <h2>Set Your Calorie Budget</h2>
      <p className="subtitle">How many calories do you have for this meal?</p>

      <div className="mode-toggle">
        <button 
          className={`toggle-btn ${mode === 'manual' ? 'active' : ''}`}
          onClick={() => setMode('manual')}
        >
          I know my budget
        </button>
        <button 
          className={`toggle-btn ${mode === 'calculate' ? 'active' : ''}`}
          onClick={() => setMode('calculate')}
        >
          Help me calculate
        </button>
      </div>

      {mode === 'manual' ? (
        <div className="manual-input">
          <div className="input-group">
            <label>Calorie Budget</label>
            <div className="calorie-input-wrapper">
              <input
                type="number"
                value={manualCalories}
                onChange={(e) => setManualCalories(e.target.value)}
                min="200"
                max="2000"
                placeholder="500"
              />
              <span className="unit">kcal</span>
            </div>
          </div>
          <button className="set-btn" onClick={handleManualSet}>
            Set Budget
          </button>
        </div>
      ) : (
        <div className="calculator-form">
          <div className="form-row">
            <div className="input-group">
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="15"
                max="100"
              />
            </div>
            <div className="input-group">
              <label>Gender</label>
              <div className="gender-toggle">
                <button
                  className={gender === 'male' ? 'active' : ''}
                  onClick={() => setGender('male')}
                >
                  Male
                </button>
                <button
                  className={gender === 'female' ? 'active' : ''}
                  onClick={() => setGender('female')}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="30"
                max="300"
              />
            </div>
            <div className="input-group">
              <label>Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="100"
                max="250"
              />
            </div>
          </div>

          <div className="input-group full-width">
            <label>Activity Level</label>
            <input
              type="range"
              min="0"
              max="4"
              value={activityLevels.findIndex(l => l.value === activityLevel)}
              onChange={(e) => setActivityLevel(activityLevels[parseInt(e.target.value)].value)}
              className="activity-slider"
            />
            <div className="activity-label">
              <strong>{activityLevels.find(l => l.value === activityLevel)?.label}</strong>
              <span>{activityLevels.find(l => l.value === activityLevel)?.description}</span>
            </div>
          </div>

          <div className="input-group full-width">
            <label>Meals per day</label>
            <input
              type="number"
              value={mealsPerDay}
              onChange={(e) => setMealsPerDay(e.target.value)}
              min="1"
              max="10"
            />
            <p className="helper-text">
              We'll subtract 5% to account for typically larger evening meals
            </p>
          </div>

          <button className="calculate-btn" onClick={handleCalculate}>
            Calculate My Budget
          </button>

          {calculatedCalories && (
            <div className="result-display">
              <span className="result-label">Your meal budget:</span>
              <span className="result-value">{calculatedCalories} kcal</span>
            </div>
          )}
        </div>
      )}

      {currentCalories && (
        <div className="current-budget">
          <span>Current budget:</span>
          <strong>{currentCalories} kcal</strong>
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import './CalorieSetup.css';

interface CalorieSetupProps {
  onCaloriesSet: (calories: number) => void;
  onBack: () => void;
}

type Gender = 'male' | 'female';

const activityLevels = [
  { value: 1.2, label: 'Sedentary', description: 'Little or no exercise, desk job' },
  { value: 1.375, label: 'Light', description: 'Light exercise 1-3 days/week' },
  { value: 1.55, label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
  { value: 1.725, label: 'Active', description: 'Heavy exercise 6-7 days/week' },
  { value: 1.9, label: 'Very Active', description: 'Very heavy exercise, physical job' },
];

function CalorieSetup({ onCaloriesSet, onBack }: CalorieSetupProps) {
  const [mode, setMode] = useState<'known' | 'calculate' | null>(null);
  const [knownCalories, setKnownCalories] = useState('');
  
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [mealsPerDay, setMealsPerDay] = useState('3');
  
  const [calculatedTDEE, setCalculatedTDEE] = useState<number | null>(null);
  const [mealCalories, setMealCalories] = useState<number | null>(null);

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
    const mealCals = Math.round((tdee / meals) * 0.95);
    
    setCalculatedTDEE(Math.round(tdee));
    setMealCalories(mealCals);
  };

  const handleKnownSubmit = () => {
    const cals = parseInt(knownCalories);
    if (cals > 0) {
      onCaloriesSet(cals);
    }
  };

  const handleCalculatedSubmit = () => {
    if (mealCalories) {
      onCaloriesSet(mealCalories);
    }
  };

  const isCalculateValid = age && weight && height && mealsPerDay;

  return (
    <div className="calorie-setup">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>
      
      <div className="step-indicator">Step 2 of 3</div>
      <h2>Set Your Calorie Budget</h2>
      <p className="subtitle">How many calories do you have for this meal?</p>

      {!mode && (
        <div className="mode-selection">
          <button 
            className="mode-card"
            onClick={() => setMode('known')}
          >
            <span className="mode-icon">🎯</span>
            <span className="mode-title">I know my budget</span>
            <span className="mode-desc">Enter a specific calorie amount</span>
          </button>
          
          <button 
            className="mode-card"
            onClick={() => setMode('calculate')}
          >
            <span className="mode-icon">🧮</span>
            <span className="mode-title">Help me calculate</span>
            <span className="mode-desc">Estimate based on your TDEE</span>
          </button>
        </div>
      )}

      {mode === 'known' && (
        <div className="known-input">
          <div className="input-group large">
            <label>Calorie Budget</label>
            <div className="calorie-input-wrapper">
              <input
                type="number"
                value={knownCalories}
                onChange={(e) => setKnownCalories(e.target.value)}
                placeholder="e.g., 600"
                min="200"
                max="2000"
              />
              <span className="unit">kcal</span>
            </div>
          </div>
          
          <div className="quick-select">
            <span>Quick select:</span>
            {[400, 500, 600, 700, 800].map(cal => (
              <button
                key={cal}
                className={`quick-btn ${knownCalories === String(cal) ? 'active' : ''}`}
                onClick={() => setKnownCalories(String(cal))}
              >
                {cal}
              </button>
            ))}
          </div>

          <div className="action-buttons">
            <button className="secondary-btn" onClick={() => setMode(null)}>
              Back
            </button>
            <button 
              className="primary-btn"
              onClick={handleKnownSubmit}
              disabled={!knownCalories || parseInt(knownCalories) < 200}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {mode === 'calculate' && (
        <div className="calculate-form">
          <div className="form-row">
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
            
            <div className="input-group">
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                min="15"
                max="100"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="kg"
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
                placeholder="cm"
                min="100"
                max="250"
              />
            </div>
          </div>

          <div className="input-group full-width">
            <label>Activity Level</label>
            <div className="activity-slider">
              <input
                type="range"
                min="0"
                max="4"
                value={activityLevels.findIndex(l => l.value === activityLevel)}
                onChange={(e) => setActivityLevel(activityLevels[parseInt(e.target.value)].value)}
              />
              <div className="activity-labels">
                {activityLevels.map((level, i) => (
                  <span 
                    key={i}
                    className={activityLevel === level.value ? 'active' : ''}
                  >
                    {level.label}
                  </span>
                ))}
              </div>
            </div>
            <p className="activity-description">
              {activityLevels.find(l => l.value === activityLevel)?.description}
            </p>
          </div>

          <div className="input-group full-width">
            <label>Meals per day</label>
            <div className="meals-select">
              {[2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  className={mealsPerDay === String(num) ? 'active' : ''}
                  onClick={() => setMealsPerDay(String(num))}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="calculate-btn"
            onClick={handleCalculate}
            disabled={!isCalculateValid}
          >
            Calculate My Budget
          </button>

          {calculatedTDEE && mealCalories && (
            <div className="calculation-result">
              <div className="result-item">
                <span className="result-label">Estimated Daily Expenditure (TDEE)</span>
                <span className="result-value">{calculatedTDEE} kcal</span>
              </div>
              <div className="result-divider">÷ {mealsPerDay} meals × 0.95</div>
              <div className="result-item highlight">
                <span className="result-label">Your Meal Budget</span>
                <span className="result-value">{mealCalories} kcal</span>
              </div>
              <p className="result-note">
                * Reduced by 5% to account for typically higher dinner consumption
              </p>
            </div>
          )}

          <div className="action-buttons">
            <button className="secondary-btn" onClick={() => setMode(null)}>
              Back
            </button>
            <button 
              className="primary-btn"
              onClick={handleCalculatedSubmit}
              disabled={!mealCalories}
            >
              Use This Budget →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalorieSetup;

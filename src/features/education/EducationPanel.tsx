
import React, { useState } from 'react';
import './EducationPanel.css';

interface EducationPanelProps {
  onClose: () => void;
}

type Tab = 'protein' | 'carbs' | 'fat';

function EducationPanel({ onClose }: EducationPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('protein');

  return (
    <div className="education-overlay" onClick={onClose}>
      <div className="education-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>🎓 Understanding Macronutrients</h2>
        <p className="panel-intro">
          Make smarter food choices by understanding how your body uses protein, carbs, and fat.
        </p>

        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'protein' ? 'active protein' : ''}`}
            onClick={() => setActiveTab('protein')}
          >
            💪 Protein
          </button>
          <button 
            className={`tab-btn ${activeTab === 'carbs' ? 'active carbs' : ''}`}
            onClick={() => setActiveTab('carbs')}
          >
            ⚡ Carbs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'fat' ? 'active fat' : ''}`}
            onClick={() => setActiveTab('fat')}
          >
            🧈 Fat
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'protein' && (
            <div className="content-section protein">
              <div className="content-header">
                <span className="content-icon">💪</span>
                <h3>Protein: Your Body's Building Blocks</h3>
              </div>
              
              <div className="benefit-list">
                <div className="benefit">
                  <span className="benefit-icon">🏗️</span>
                  <div>
                    <strong>Muscle Growth & Recovery</strong>
                    <p>Protein provides essential amino acids that repair and build muscle tissue after exercise.</p>
                  </div>
                </div>
                
                <div className="benefit">
                  <span className="benefit-icon">🔥</span>
                  <div>
                    <strong>High Thermic Effect</strong>
                    <p>Your body burns 20-30% of protein calories just digesting it—compared to only 5-10% for carbs and 0-3% for fat.</p>
                  </div>
                </div>
                
                <div className="benefit">
                  <span className="benefit-icon">😊</span>
                  <div>
                    <strong>Superior Satiety</strong>
                    <p>Protein keeps you feeling fuller for longer, naturally reducing overall calorie intake.</p>
                  </div>
                </div>
              </div>

              <div className="science-box">
                <h4>🧬 The Science of Fat Gain Resistance</h4>
                <p>
                  Protein has a remarkable resistance to being stored as body fat. Here's why:
                </p>
                <ol>
                  <li><strong>Gluconeogenesis Required:</strong> Before protein can contribute to fat stores, it must first be converted to glucose through an inefficient process.</li>
                  <li><strong>Glycogen Filling:</strong> That glucose then fills liver and muscle glycogen stores before any fat storage can occur.</li>
                  <li><strong>De Novo Lipogenesis:</strong> Only after glycogen is full can the complex process of converting protein to fat (de novo lipogenesis) begin.</li>
                </ol>
                <p className="highlight-text">
                  This multi-step process makes protein the least likely macronutrient to contribute to fat gain!
                </p>
              </div>

              <div className="tip-box">
                <span className="tip-icon">💡</span>
                <p><strong>Pro Tip:</strong> Aim for meals with 25-40g of protein to maximize muscle protein synthesis and satiety.</p>
              </div>
            </div>
          )}

          {activeTab === 'carbs' && (
            <div className="content-section carbs">
              <div className="content-header">
                <span className="content-icon">⚡</span>
                <h3>Carbohydrates: Your Performance Fuel</h3>
              </div>
              
              <div className="benefit-list">
                <div className="benefit">
                  <span className="benefit-icon">🏃</span>
                  <div>
                    <strong>Primary Energy Source</strong>
                    <p>Carbs are your body's preferred fuel for high-intensity exercise and brain function.</p>
                  </div>
                </div>
                
                <div className="benefit">
                  <span className="benefit-icon">⛽</span>
                  <div>
                    <strong>Glycogen Storage</strong>
                    <p>Your body stores 400-500g of glycogen in muscles and liver—your readily available energy reserve.</p>
                  </div>
                </div>
                
                <div className="benefit">
                  <span className="benefit-icon">🧠</span>
                  <div>
                    <strong>Brain Power</strong>
                    <p>Your brain uses ~120g of glucose daily, making carbs essential for cognitive function.</p>
                  </div>
                </div>
              </div>

              <div className="science-box">
                <h4>🔋 The Glycogen Buffer</h4>
                <p>
                  Like protein, carbohydrates have built-in protection against immediate fat storage:
                </p>
                <ol>
                  <li><strong>Immediate Use:</strong> Carbs first fuel current activity and maintain blood sugar.</li>
                  <li><strong>Glycogen Replenishment:</strong> Excess carbs refill glycogen stores in muscles and liver (400-500g capacity).</li>
                  <li><strong>Only Then Fat Storage:</strong> De novo lipogenesis (converting carbs to fat) only occurs when glycogen stores are completely full.</li>
                </ol>
                <p className="highlight-text">
                  Regular exercise keeps glycogen stores partially depleted, creating a buffer against carb-driven fat gain.
                </p>
              </div>

              <div className="tip-box">
                <span className="tip-icon">💡</span>
                <p><strong>Pro Tip:</strong> Focus on fiber-rich carbs—they digest slower, providing sustained energy and keeping you fuller longer.</p>
              </div>
            </div>
          )}

          {activeTab === 'fat' && (
            <div className="content-section fat">
              <div className="content-header">
                <span className="content-icon">🧈</span>
                <h3>Fat: The Practical Perspective</h3>
              </div>
              
              <div className="benefit-list">
                <div className="benefit">
                  <span className="benefit-icon">🧪</span>
                  <div>
                    <strong>Essential Functions</strong>
                    <p>Fat is vital for hormone production, vitamin absorption (A, D, E, K), and cell membrane health.</p>
                  </div>
                </div>
                
                <div className="benefit">
                  <span className="benefit-icon">📊</span>
                  <div>
                    <strong>Calorie Dense</strong>
                    <p>At 9 calories per gram (vs 4 for protein/carbs), fat provides concentrated energy but adds up quickly.</p>
                  </div>
                </div>
                
                <div className="benefit">
                  <span className="benefit-icon">🥜</span>
                  <div>
                    <strong>Naturally Abundant</strong>
                    <p>Fat is present in most foods, making deficiency extremely rare in normal diets.</p>
                  </div>
                </div>
              </div>

              <div className="science-box warning">
                <h4>⚠️ The Fat Storage Reality</h4>
                <p>
                  Unlike protein and carbs, dietary fat faces no barriers to storage:
                </p>
                <ol>
                  <li><strong>Direct Storage:</strong> Dietary fat can be stored directly as body fat with minimal conversion.</li>
                  <li><strong>Low Thermic Effect:</strong> Only 0-3% of fat calories are burned during digestion.</li>
                  <li><strong>No Buffer System:</strong> There's no "glycogen equivalent" for fat—excess goes straight to storage.</li>
                </ol>
                <p className="highlight-text">
                  From a practical weight management perspective, fat is the macronutrient that most easily contributes to fat gain.
                </p>
              </div>

              <div className="tip-box">
                <span className="tip-icon">💡</span>
                <p><strong>Pro Tip:</strong> You almost certainly get enough fat naturally. Focus on prioritizing protein and then carbs for energy, and let fat fill in the rest.</p>
              </div>
            </div>
          )}
        </div>

        <div className="summary-section">
          <h4>🎯 Quick Reference</h4>
          <div className="quick-ref-grid">
            <div className="quick-ref protein">
              <strong>Protein</strong>
              <span>Prioritize First</span>
              <span className="detail">High thermic effect, muscle building, very hard to store as fat</span>
            </div>
            <div className="quick-ref carbs">
              <strong>Carbs</strong>
              <span>Performance Fuel</span>
              <span className="detail">Powers exercise, fills glycogen first, moderate storage resistance</span>
            </div>
            <div className="quick-ref fat">
              <strong>Fat</strong>
              <span>Let It Fill In</span>
              <span className="detail">Essential but abundant, easily stored, don't need to prioritize</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationPanel;

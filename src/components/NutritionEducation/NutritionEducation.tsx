
import React, { useState } from 'react';
import './NutritionEducation.css';

interface EducationCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  summary: string;
  content: string[];
}

const educationContent: EducationCard[] = [
  {
    id: 'protein',
    title: 'Protein',
    icon: '💪',
    color: '#10b981',
    summary: 'The muscle builder with weight management benefits',
    content: [
      "Protein is essential for muscle growth, repair, and recovery. When you exercise, you create micro-tears in your muscle fibers that protein helps repair, making them stronger.",
      "Protein has the highest thermic effect of food (TEF) at 20-35%, meaning your body uses 20-35% of protein's calories just to digest it. Compare this to carbs (5-10%) and fat (0-3%).",
      "For protein to contribute to fat storage, it must first undergo gluconeogenesis (conversion to glucose), then fill glycogen stores, and only then undergo de novo lipogenesis. This multi-step process makes protein the least likely macronutrient to be stored as fat.",
      "Aim for 1.6-2.2g of protein per kg of body weight if you're physically active. Spreading protein intake across meals optimizes muscle protein synthesis."
    ]
  },
  {
    id: 'carbs',
    title: 'Carbohydrates',
    icon: '⚡',
    color: '#f59e0b',
    summary: 'Your performance fuel',
    content: [
      "Carbohydrates are your body's preferred fuel source for high-intensity exercise and brain function. They're stored as glycogen in your muscles and liver.",
      "Your body can store approximately 400-500g of glycogen in muscles and 100g in the liver. This stored energy is readily available for physical activity.",
      "Similar to protein, carbs must first fill glycogen stores before they can contribute to fat storage through de novo lipogenesis. This means if you're active and deplete glycogen regularly, carbs are efficiently used as fuel.",
      "Complex carbohydrates with fiber provide sustained energy and help regulate blood sugar. The fiber content in whole grains and vegetables also supports digestive health and satiety."
    ]
  },
  {
    id: 'fat',
    title: 'Dietary Fat',
    icon: '🫒',
    color: '#ef4444',
    summary: 'Essential but easily over-consumed',
    content: [
      "Dietary fat is essential for hormone production, vitamin absorption (A, D, E, K), and cell membrane integrity. However, it's the most calorie-dense macronutrient at 9 calories per gram.",
      "Unlike protein and carbs, dietary fat can be directly stored as body fat with minimal metabolic processing. It has the lowest thermic effect (0-3%) and requires little energy to digest and store.",
      "In modern diets, it's extremely difficult to under-consume fat. It's present in most processed foods, cooking methods, and naturally occurring in many protein sources.",
      "Focus on unsaturated fats from sources like olive oil, nuts, and fatty fish while limiting saturated fats. The goal isn't to eliminate fat, but to be mindful that it's easily over-consumed and efficiently stored."
    ]
  }
];

export const NutritionEducation: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="nutrition-education">
      <div className="education-header">
        <h2>📚 Understanding Your Macros</h2>
        <p>Tap to learn how each macronutrient affects your body and goals</p>
      </div>

      <div className="education-cards">
        {educationContent.map((card) => (
          <div 
            key={card.id}
            className={`education-card ${expandedCard === card.id ? 'expanded' : ''}`}
            style={{ '--card-color': card.color } as React.CSSProperties}
            onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
          >
            <div className="card-header">
              <span className="card-icon">{card.icon}</span>
              <div className="card-title-area">
                <h3>{card.title}</h3>
                <p className="card-summary">{card.summary}</p>
              </div>
              <span className={`expand-icon ${expandedCard === card.id ? 'rotated' : ''}`}>
                ▼
              </span>
            </div>

            {expandedCard === card.id && (
              <div className="card-content">
                {card.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="education-tip">
        <span className="tip-icon">💡</span>
        <div className="tip-content">
          <strong>Pro Tip:</strong> When building your meal deal, prioritize protein for satiety and muscle support, 
          include carbs for energy, and be mindful of fat content as it adds calories quickly without filling you up.
        </div>
      </div>
    </div>
  );
};

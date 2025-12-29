
import React from 'react';
import './ProgressSteps.css';

interface Step {
  id: number;
  label: string;
  icon: string;
}

interface ProgressStepsProps {
  currentStep: number;
  steps: Step[];
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="progress-steps">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
            <div className="step-circle">
              {currentStep > step.id ? '✓' : step.icon}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`step-line ${currentStep > step.id ? 'completed' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

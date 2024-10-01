import React from "react";

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange?: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-gray-100">
      <div className="font-bold text-2xl mb-4">Register New Tenant</div>
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        {/* Step Indicators */}
        <div className="flex gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 flex items-center justify-center p-4 font-semibold ${
                index === currentStep ? "border-b-2 border-primary" : ""
              }`}
            >
              {steps.length > 1 && (
                <div
                  className={`${
                    index === currentStep ? "bg-primary-light" : "bg-primary"
                  } flex justify-center text-white items-center w-8 aspect-square rounded-full mr-4`}
                >
                  {index + 1}
                </div>
              )}
              <p>{step.title}</p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="steps-content mt-4">{steps[currentStep].content}</div>
      </div>
    </div>
  );
};

export default Stepper;

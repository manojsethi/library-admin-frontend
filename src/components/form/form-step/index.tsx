import React from "react";

interface FormStepProps {
  key: any;
  children: React.ReactNode;
  onSubmit: () => void;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

const FormStep: React.FC<FormStepProps> = ({
  children,
  key,
  onSubmit,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}) => {
  return (
    <form key={key} onSubmit={onSubmit} className="space-y-4">
      {children}
      <div className="flex justify-between mt-4">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={onPrev}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Previous
          </button>
        )}
        <button
          type="submit"
          className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          {currentStep < totalSteps - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormStep;

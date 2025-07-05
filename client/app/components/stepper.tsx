import {
  StepperComponent,
  StepsDirective,
  StepDirective,
} from "@syncfusion/ej2-react-navigations";
import React from "react";

type Step = {
  label: string;
  iconCss: string;
};

interface StepperProps {
  currentStep: number;
  steps?: Step[];
  onStepClick?: (index: number) => void;
  className?: string;
}

const defaultSteps: Step[] = [
  { label: "Informtion", iconCss: "sf-icon-transport" },
  { label: "Paiement", iconCss: "sf-icon-payment" },
  { label: "Confirmation", iconCss: "sf-icon-success" },
];

export default function Stepper({
  currentStep,
  steps = defaultSteps,
  onStepClick,
  className = "",
}: StepperProps) {
  const stepModels = steps.map((step, i) => ({
    label: step.label,
    iconCss: step.iconCss,
    cssClass: i < currentStep ? "e-step-done" : "",
  }));
  return (
    <>
      <div className={`stepper-wrapper ${className}`}>
        <StepperComponent
          activeStep={currentStep}
          stepType="indicator"
          steps={stepModels}
        >
          <StepsDirective>
            {steps.map((step, index) => (
              <StepDirective
                key={index}
                iconCss={step.iconCss}
                label={step.label}
                disabled={index > currentStep}
              />
            ))}
          </StepsDirective>
        </StepperComponent>
      </div>
      <div className="stepper-label mt-4">
        <StepperComponent>
          <StepsDirective>
             {steps.map((step, index) => (
              <StepDirective
                key={index}
                label={step.label}
              />
            ))}

          </StepsDirective>
        </StepperComponent>
      </div>
    </>
  );
}

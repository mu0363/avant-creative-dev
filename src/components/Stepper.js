import React, { useState, useEffect, useRef } from "react";

export const Stepper = ({ steps, currentStepNumber }) => {
  const [stepperSteps, setStep] = useState([]);
  const stepsStateRef = useRef();

  useEffect(() => {
    const stepsState = steps.map((step, index) => {
      const stepObj = {};
      stepObj.description = step;
      stepObj.completed = false;
      stepObj.highlighted = index === 0 ? true : false;
      stepObj.selected = index === 0 ? true : false;
      return stepObj;
    });

    stepsStateRef.current = stepsState;

    const currentSteps = updateStep(currentStepNumber - 1, stepsState);
    setStep(currentSteps);
  }, []);

  useEffect(() => {
    const currentSteps = updateStep(currentStepNumber - 1, stepsStateRef.current);
    setStep(currentSteps);
  }, [currentStepNumber]);

  function updateStep(stepNumber, steps) {
    const newSteps = [...steps];

    let stepCounter = 0;
    while (stepCounter < newSteps.length) {
      //current step
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false,
        };
        stepCounter++;
      }
      // Past step
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true,
        };
        stepCounter++;
      }
      // Future steps
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        };
        stepCounter++;
      }
    }
    return newSteps;
  }

  return (
    <div className="flex items-center space-x-2">
      <p className="text-gray-400">
        Step {currentStepNumber} / {steps.length}
      </p>
      {stepperSteps.map((step, index) => (
        <div key={index}>
          <div
            className={`rounded-full bg-white h-3 w-3 sm:h-3 sm:w-3 flex items-center justify-center ${
              step.selected ? "bg-red-200" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

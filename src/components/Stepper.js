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

  const stepsDisplay = stepperSteps.map((step, index) => {
    return (
      <div key={index} className={index !== stepperSteps.length - 1 ? "w-full flex items-center" : "flex items-center"}>
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 bg-white h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center ${
              step.selected ? "bg-red-200 text-white font-bold" : ""
            }`}
          >
            {step.completed ? <span className="text-white font-bold text-xl">&#10003;</span> : index + 1}
          </div>
        </div>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300 "> </div>
      </div>
    );
  });

  return <div className="flex justify-between items-center sm:max-w-2xl max-w-sm m-auto">{stepsDisplay}</div>;
};

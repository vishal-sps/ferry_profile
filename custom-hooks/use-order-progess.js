import { useState, useEffect } from "react";

export default function useOrderProgress() {
  const [completedSteps, setCompletedSteps] = useState([0]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const step = localStorage.getItem("currentStep");
    const completedSteps = JSON.parse(localStorage.getItem("completedSteps"));
    setStep(Number(step) || 0);
    setCompletedSteps(completedSteps || [0]);
  }, []);

  const updateStep = (step) => {
    setStep(step);
    setCompletedSteps([...new Set([...completedSteps, step])]);
    
    localStorage.setItem("currentStep", step);
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    if (step === 3) {
      localStorage.removeItem("completedSteps");
      localStorage.removeItem("currentStep");
    }
    //console.log("completed steps - ", completedSteps, " current step - ", step);
  };

  const hasCompletedStep = (step) => {
    //console.log("has completed steps - ", step, completedSteps,  completedSteps.includes(step));
    return completedSteps.includes(step);
  };

  return {
    step,
    updateStep,
    hasCompletedStep,
  };
}

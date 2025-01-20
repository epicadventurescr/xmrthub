import { useState } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { StepCard } from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Install Termux",
    description:
      "First, we'll guide you through installing Termux, a powerful terminal emulator for Android.",
    content: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Open the Google Play Store on your Android device</li>
          <li>Search for "Termux"</li>
          <li>Install the official Termux app</li>
          <li>Open Termux after installation is complete</li>
        </ol>
      </div>
    ),
  },
  {
    title: "Step 2",
    description: "Configure your development environment.",
    content: <div className="text-gray-600">Configuration steps will go here.</div>,
  },
  {
    title: "Step 3",
    description: "Start building your dApp.",
    content: <div className="text-gray-600">Final steps will go here.</div>,
  },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MaticDapps Launcher
          </h1>
          <p className="text-lg text-gray-600">
            Build your dApp in three simple steps
          </p>
        </motion.div>

        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {steps.map((step, index) => (
              <div key={index} className={index !== currentStep ? "hidden" : ""}>
                <StepCard
                  title={step.title}
                  description={step.description}
                  isActive={index === currentStep}
                >
                  {step.content}
                </StepCard>
              </div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="transition-all duration-300 hover:bg-gray-50"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="bg-matic hover:bg-matic-dark transition-all duration-300"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
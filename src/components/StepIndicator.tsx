
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            index < currentStep
              ? "bg-primary scale-100"
              : index === currentStep
              ? "bg-primary/70 scale-110 animate-pulse"
              : "bg-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
};

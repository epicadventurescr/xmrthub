
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepCardProps {
  title: string;
  description: string;
  isActive: boolean;
  children?: React.ReactNode;
}

export const StepCard = ({
  title,
  description,
  isActive,
  children,
}: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "rounded-md p-4 font-mono border transition-all duration-300",
        isActive
          ? "bg-card border-primary/50 shadow-lg shadow-primary/20"
          : "bg-card/50 border-border opacity-50"
      )}
    >
      <h3 className="text-lg font-bold text-primary mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      {children}
    </motion.div>
  );
};

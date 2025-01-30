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
          ? "bg-black/80 border-blue-500/50 shadow-lg shadow-blue-500/20"
          : "bg-gray-900/50 border-gray-800 opacity-50"
      )}
    >
      <h3 className="text-lg font-bold text-blue-500 mb-1">{title}</h3>
      <p className="text-sm text-blue-400/80 mb-3">{description}</p>
      {children}
    </motion.div>
  );
};
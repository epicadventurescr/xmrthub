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
        "rounded-xl p-6 backdrop-blur-sm transition-all duration-300",
        isActive
          ? "bg-white/90 shadow-lg ring-1 ring-gray-100"
          : "bg-gray-50/50 opacity-50"
      )}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </motion.div>
  );
};
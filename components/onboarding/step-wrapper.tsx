import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StepWrapperProps {
  children: ReactNode;
  icon: ReactNode;
  title: string;
  description?: string;
}

export const StepWrapper = ({ children, icon, title, description }: StepWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-8"
      >
        {icon}
      </motion.div>
      <h2 className="text-3xl font-bold text-foreground mb-3 text-center">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground mb-8 text-center font-medium">{description}</p>
      )}
      <div className="w-full space-y-6">{children}</div>
    </motion.div>
  );
};

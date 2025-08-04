import { motion } from "framer-motion";
import React from "react";

interface AnimatedWrapperProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

// Slide from left to right
export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  duration = 0.5,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Slide from top to bottom
export const AnimatedWrapperTop: React.FC<AnimatedWrapperProps> = ({
  children,
  duration = 0.5,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;

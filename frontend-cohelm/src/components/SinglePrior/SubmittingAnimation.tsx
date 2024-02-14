import React from "react";
import { motion } from "framer-motion";
import { FiFile } from "react-icons/fi";

interface SubmittingAnimationProps {
  label: string
};

const SubmittingAnimation = ({label}: SubmittingAnimationProps) => {
  return (
    <div className="h-full w-full">
      <div className="relative">
        <motion.div
          className="box h-20 w-20 mt-6 mx-auto rounded-2xl border-blue-500 border-8"
          animate={{ rotate: [0, 180], scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 13,
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
        />
        <motion.div
          className="absolute top-0 flex h-full w-full items-center justify-center"
          style={{ marginTop: 1 }}
          animate={{
            y: -3,
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <FiFile className="w-6 h-6 text-blue-500" />
        </motion.div>
      </div>

      <p className="text-gray-500 text-sm text-center mt-6">
        {label}...
      </p>
    </div>
  );
};

export default SubmittingAnimation;

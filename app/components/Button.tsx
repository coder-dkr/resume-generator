import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick : (e : React.FormEvent) => void
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  icon,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex  w-full items-center justify-center px-6 py-3 bg-gradient-to-r from-[#539B73] to-[#3A6C50] text-white rounded-lg shadow hover:opacity-80 transition duration-300 cursor-pointer"
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;

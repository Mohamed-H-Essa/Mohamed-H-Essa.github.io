import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { parallaxCard } from '../../utils/animations';

interface CardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  ...motionProps
}) => {
  const baseStyles = `
    bg-white rounded-xl shadow-md border border-gray-100
    transition-all duration-300 overflow-hidden
  `;

  const hoverStyles = hoverable ? `
    hover:shadow-xl hover:border-gray-200
    cursor-pointer
  ` : '';

  return (
    <motion.div
      variants={hoverable ? parallaxCard : undefined}
      initial={hoverable ? "rest" : undefined}
      whileHover={hoverable ? "hover" : undefined}
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default Card;
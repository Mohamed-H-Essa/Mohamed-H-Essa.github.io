import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
  ...props
}) => {
  const baseStyles = "bg-card-bg border border-card-border rounded-lg shadow-sm";
  const hoverStyles = hoverable
    ? "transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
    : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
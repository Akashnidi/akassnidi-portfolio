import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`
        bg-white bg-opacity-90 p-6 rounded-xl shadow-lg
        hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
        ${className || ''}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
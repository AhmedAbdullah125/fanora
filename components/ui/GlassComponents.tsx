
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

// Renamed internally but exported as GlassCard for compatibility
export const GlassCard: React.FC<CardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`
        bg-card-bg 
        ${hoverEffect ? 'transition-all duration-300 hover:shadow-hover hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '', 
  ...props 
}) => {
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const baseStyles = "rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-md",
    secondary: "bg-accent-light text-primary hover:bg-green-100",
    outline: "bg-transparent text-primary border border-border hover:bg-hero-bg",
    glass: "bg-transparent text-primary border border-border hover:bg-hero-bg", // Fallback
  };

  // Handle legacy variant prop
  const variantStyle = variants[variant as keyof typeof variants] || variants.primary;
  const sizing = sizeStyles[size];

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizing} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
'use client'

interface ButtonProps {
    children?: any;
    onClick?: () => void;
    className?: string;
    variant?: 'default' | 'primary' | 'minimal' | 'outline' | 'disabled';
    disabled?: boolean;
}


export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className = '', onClick, disabled = false }) => {
  return (
    <button
      className={`flex items-center h-11 px-5 rounded-full gap-3 transition-none text-sm
        ${variant === 'primary' && 'bg-primary active:bg-primary/80'} 
        ${variant === 'default' && 'bg-light-gray active:bg-light-gray/80'}
        ${variant === 'outline' && 'border-primary active:border-primary/80 border'}
        ${variant === 'disabled' && 'border-light-gray'}
        ${className}
      `}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
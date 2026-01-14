import { Plus } from "lucide-react";
import type { MouseEvent } from "react";

interface ActionButtonProps {
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
  icon?: boolean;
  disabled?: boolean;
}

const ActionButton = ({ 
  label, 
  onClick, 
  variant = "primary",
  icon = false,
  disabled = false
}: ActionButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {icon && <Plus size={18} />}
      {label}
    </button>
  );
};

export default ActionButton;

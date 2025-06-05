import buttonstyles from "./button.module.css";
type ColorVariant = "primary" | "secondary" | "outline" | "ghost";
type SizeVariant = "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  type: "button" | "submit";
  variant: ColorVariant;
  size: SizeVariant;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonstyles.button} ${buttonstyles[variant]} ${buttonstyles[size]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Button;

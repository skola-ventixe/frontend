import styles from "./button.module.css";
type ColorVariant = "primary" | "secondary" | "outline" | "ghost";
type SizeVariant = "sm" | "md" | "lg" | "xl";

interface ButtonRoundProps {
  type: "button" | "submit";
  variant: ColorVariant;
  size: SizeVariant;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function ButtonRound({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonRoundProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
export default ButtonRound;

import styles from "./straightprogressbar.module.css";

type StraightProgressBarProps = {
  progress?: number;
  variant?: "primary" | "secondary" | "grey" | "cool-grey";
  size?: "sm" | "md" | "lg";
};

function StraightProgressBar({
  progress = 0,
  variant = "primary",
  size = "md",
}: StraightProgressBarProps) {
  return (
    <div className={`${styles.progressBar} ${styles[variant]} ${styles[size]}`}>
      <div
        className={`${styles.filled}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
export default StraightProgressBar;

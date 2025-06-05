import { CircleCheck, Ellipsis } from "lucide-react";
import styles from "./packagescard.module.css";
import { Packages } from "@/services/eventService";

export interface PackagesCardProps {
  packages: Packages[];
  onClick?: (eventPkg: Packages) => void;
}

function PackagesCard({ packages, onClick }: PackagesCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h6>Packages</h6>
        <Ellipsis />
      </div>
      <div className={styles.cardContent}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={styles.packageItem}
            onClick={() => onClick && onClick(pkg)}
          >
            <h5 className={styles.packageName}>{pkg.name}</h5>
            <p className={styles.packagePrice}>${pkg.price.toFixed(2)}</p>
            <ul className={styles.packageSeating}>
              <li>
                <p className={styles.packageSeated}>
                  <CircleCheck size={12} />
                  {pkg.seated ? "Seated" : "Standing"}
                </p>
              </li>
              <li>
                <p className={styles.packageSeated}>
                  <CircleCheck size={12} />
                  {pkg.placement}
                </p>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PackagesCard;

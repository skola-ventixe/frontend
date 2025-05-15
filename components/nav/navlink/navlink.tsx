"use client";

import { usePathname } from "next/navigation";
import styles from "./navlink.module.css";

function NavLink({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) {
  const pathname = usePathname();

  return (
    <li
      className={`${styles.navLink} ${pathname === route ? styles.active : ""}`}
    >
      <div className={styles.selectedTag}></div>
      {children}
    </li>
  );
}
export default NavLink;

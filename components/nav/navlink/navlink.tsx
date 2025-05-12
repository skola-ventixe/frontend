import styles from "./navlink.module.css";

function NavLink({ children }: { children: React.ReactNode }) {
  return (
    <li className={styles.navLink}>
      <div className={styles.selectedTag}></div>
      {children}
    </li>
  );
}
export default NavLink;

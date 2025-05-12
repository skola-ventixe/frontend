import PageTitle from "./pagetitle/pagetitle";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <PageTitle />
      <div></div>
    </div>
  );
}
export default Header;

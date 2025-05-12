import styles from "./nav.module.css";
import Image from "next/image";
import {
  CircleDollarSign,
  LayoutGrid,
  LogOut,
  ReceiptText,
  SquareCheck,
} from "lucide-react";
import NavLink from "./navlink/navlink";
import Link from "next/link";

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navWrapper}>
        <Link href="/">
          <div className={styles.logo}>
            <Image
              src="/ventixe.svg"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <h3 className={styles.navLinkText}>Ventixe</h3>
          </div>
        </Link>
        <ul className={styles.navLinks}>
          <Link href="/">
            <NavLink>
              <LayoutGrid />
              <span className={styles.navLinkText}>Dashboard</span>
            </NavLink>
          </Link>
          <Link href="/bookings">
            <NavLink>
              <SquareCheck />
              <span className={styles.navLinkText}>Bookings</span>
            </NavLink>
          </Link>
          <Link href="/invoices">
            <NavLink>
              <ReceiptText />
              <span className={styles.navLinkText}>Invoices</span>
            </NavLink>
          </Link>
          <Link href="/finacials">
            <NavLink>
              <CircleDollarSign />
              <span className={styles.navLinkText}>Financials</span>
            </NavLink>
          </Link>
        </ul>
      </div>
      <button className="btn btnSignout" type="button">
        <LogOut strokeWidth={1.5} />
        <span className={styles.navLinkText}>Sign Out</span>
      </button>
    </nav>
  );
}
export default Nav;

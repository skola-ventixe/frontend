"use client";

import styles from "./nav.module.css";
import Image from "next/image";
import {
  CircleDollarSign,
  LayoutGrid,
  LogOut,
  Menu,
  ReceiptText,
  SquareCheck,
} from "lucide-react";
import NavLink from "./navlink/navlink";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";

function Nav() {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard";

    return pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
  };

  const handleNavToggle = () => {
    setShowNav((prev) => !prev);
  };

  const [displayName, setDisplayName] = useState("Ventixe");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayName(getPageTitle());
      } else {
        setDisplayName("Ventixe");
      }
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]); // Re-run when pathname changes too

  return (
    <nav className={`${styles.nav} ${showNav ? styles.navActive : ""}`}>
      <Link href="/">
        <div className={styles.logo}>
          <Image
            src="/ventixe.svg"
            width={24}
            height={24}
            alt="Picture of the author"
          />
          <h3 className={styles.navLinkText}>{displayName}</h3>
        </div>
      </Link>
      <ul className={styles.navLinks}>
        <Link href="/">
          <NavLink route="/">
            <LayoutGrid className={styles.navLogo} />
            <span className={styles.navLinkText}>Dashboard</span>
          </NavLink>
        </Link>
        <Link href="/bookings">
          <NavLink route="/bookings">
            <SquareCheck className={styles.navLogo} />
            <span className={styles.navLinkText}>Bookings</span>
          </NavLink>
        </Link>
        <Link href="/invoices">
          <NavLink route="/invoices">
            <ReceiptText className={styles.navLogo} />
            <span className={styles.navLinkText}>Invoices</span>
          </NavLink>
        </Link>
        <Link href="/finacials">
          <NavLink route="/finacials">
            <CircleDollarSign className={styles.navLogo} />
            <span className={styles.navLinkText}>Financials</span>
          </NavLink>
        </Link>
      </ul>
      <button
        onClick={logout}
        className={`btn ${styles.btnSignout}`}
        type="button"
      >
        <LogOut strokeWidth={1.5} />
        <span className={styles.navLinkText}>Sign Out</span>
      </button>
      <Menu
        strokeWidth={2.5}
        className={styles.bars}
        onClick={handleNavToggle}
      />
    </nav>
  );
}
export default Nav;

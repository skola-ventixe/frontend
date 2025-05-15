import Link from "next/link";
import styles from "./footer.module.css";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; 2025 Ventixe</p>
      <div className={styles.links}>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms and condistions</Link>
        <Link href="#">Contact</Link>
      </div>
      <div className={styles.socials}>
        <Link href="#">
          <Facebook strokeWidth={1.5} />
        </Link>
        <Link href="#">
          <Twitter strokeWidth={1.5} />
        </Link>
        <Link href="#">
          <Instagram strokeWidth={1.5} />
        </Link>
        <Link href="#">
          <Youtube strokeWidth={1.5} />
        </Link>
        <Link href="#">
          <Linkedin strokeWidth={1.5} />
        </Link>
      </div>
    </footer>
  );
}
export default Footer;

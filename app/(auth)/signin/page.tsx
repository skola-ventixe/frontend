import styles from "./signin.module.css";
import Image from "next/image";
import SignInForm from "@/components/auth/signinform/signinform";

function SignIn() {
  return (
    <main className={styles.card}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image width={30} height={30} src="/ventixe.svg" alt="Logo" />
          <h2 className={styles.logoTitle}>Ventixe</h2>
        </div>
        <Image width={800} height={800} src="/Dancefloor.jpg" alt="Logo" />
        <h1>Sign In</h1>
      </div>
      <div className={styles.body}>
        <SignInForm />
      </div>
      <div className={styles.footer}>
        <p>
          Not yet registered?{" "}
          <a href="/signup" className={styles.link}>
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
export default SignIn;

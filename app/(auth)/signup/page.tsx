import Image from "next/image";
import styles from "./signup.module.css";
import SignUpForm from "@/components/auth/signinform/signupform/signupform";

function SignUp() {
  return (
    <main className={styles.card}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image width={30} height={30} src="/ventixe.svg" alt="Logo" />
          <h2 className={styles.logoTitle}>Ventixe</h2>
        </div>
        <Image width={800} height={800} src="/Dancefloor.jpg" alt="Logo" />
        <h1>Sign Up</h1>
      </div>
      <div className={styles.body}>
        <SignUpForm />
      </div>
      <div className={styles.footer}>
        <p>
          Already have an account?{" "}
          <a href="/signin" className={styles.link}>
            Sign In
          </a>
        </p>
      </div>
    </main>
  );
}
export default SignUp;

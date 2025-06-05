"use client";

import Button from "@/components/utility/button/button";
import styles from "./signupform.module.css";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

type StepType = "EMAIL" | "VERIFY" | "COMPLETE";

function SignUpForm() {
  const [step, setStep] = useState<StepType>("EMAIL");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { register, checkExists, verify, loading, error } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await checkExists(email);
      if (response) {
        return;
      }
      setStep("VERIFY");
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await verify({ email, code: verificationCode });
      if (!response) {
        return;
      }
      setStep("COMPLETE");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password, confirmPassword, firstName, lastName });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.formContainer}>
      {error && <div className={styles.error}>{error}</div>}

      {step === "EMAIL" && (
        <form onSubmit={handleEmailSubmit} className={styles.form}>
          <h2 className={styles.stepTitle}>Step 1: Enter your email</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Sending..." : "Continue"}
          </Button>
        </form>
      )}

      {step === "VERIFY" && (
        <form onSubmit={handleVerificationSubmit} className={styles.form}>
          <h2 className={styles.stepTitle}>Step 2: Verify your email</h2>
          <p className={styles.instructions}>
            We've sent a 6-digit code to <strong>{email}</strong>
          </p>
          <div className={styles.inputGroup}>
            <label htmlFor="verificationCode">Verification Code:</label>
            <input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              pattern="\d{6}"
              required
              autoFocus
              autoComplete="one-time-code"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Sending..." : "Continue"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            className={styles.submitButton}
            disabled={loading}
            onClick={() => setStep("EMAIL")}
          >
            Back
          </Button>
        </form>
      )}

      {step === "COMPLETE" && (
        <form
          onSubmit={handleCompleteSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <h2 className={styles.stepTitle}>Step 3: Complete Registration</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Sending..." : "Register"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            className={styles.submitButton}
            disabled={loading}
            onClick={() => setStep("VERIFY")}
          >
            Back
          </Button>
        </form>
      )}
    </div>
  );
}
export default SignUpForm;

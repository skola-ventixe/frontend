"use client";
import Breadcrumb from "@/components/utility/breadcrumb/breadcrumb";
import { formatTitle } from "@/components/utility/pagetitle";
import styles from "./pagetitle.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";

function PageTitle() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div className={styles.pagetitle}>
      <Breadcrumb />
      <h2 className={styles.h2}>{formatTitle()}</h2>
      {pathname === "/" ? (
        <p className={styles.greeting}>
          {" "}
          Hello {user?.fullname.split(" ")[0]}, welcome back!
        </p>
      ) : null}
    </div>
  );
}
export default PageTitle;

"use client";

import PageTitle from "./pagetitle/pagetitle";
import styles from "./header.module.css";
import AvatarCircle from "../utility/avatarcircle/avatarcircle";
import ButtonRound from "../utility/buttonround/buttonround";
import { Bell, Settings } from "lucide-react";
import PopoverMenu from "../utility/popovermenu/popovermenu";
import { useAuth } from "@/context/authContext";

function Header() {
  const { user } = useAuth();

  return (
    <div className={styles.header}>
      <PageTitle />
      <div className={styles.actions}>
        <ButtonRound variant="secondary" size="xl" type="button">
          <Bell />
        </ButtonRound>
        <PopoverMenu
          trigger={
            <ButtonRound variant="secondary" size="xl" type="button">
              <Settings />
            </ButtonRound>
          }
          align="right"
        >
          Hej
        </PopoverMenu>
      </div>
      <div className={styles.user}>
        <AvatarCircle />
        <div className={styles.userName}>
          <span className={styles.name}>{user?.fullname}</span>
          <span className={styles.role}>Admin</span>
        </div>
      </div>
    </div>
  );
}
export default Header;

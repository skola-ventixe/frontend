import Image from "next/image";
import styles from "./avatarcircle.module.css";

function AvatarCircle() {
  return (
    <Image
      className={styles.avatarCircle}
      src="/avatar-template.svg"
      width={40}
      height={40}
      alt="Picture of the user"
      style={{ objectFit: "contain" }}
    />
  );
}
export default AvatarCircle;

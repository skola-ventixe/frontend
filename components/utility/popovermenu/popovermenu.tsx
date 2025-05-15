"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import styles from "./popovermenu.module.css";

interface PopoverMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

export default function PopoverMenu({
  trigger,
  children,
  align = "right",
}: PopoverMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the popover
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Toggle the menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.popoverContainer} ref={popoverRef}>
      <div onClick={toggleMenu} className={styles.triggerWrapper}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`${styles.menuContent} ${styles[align]}`}>
          {children}
        </div>
      )}
    </div>
  );
}

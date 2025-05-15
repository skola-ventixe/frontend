"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./breadcrumb.module.css";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  homeLabel?: string;
}

export default function Breadcrumb({
  homeLabel = "Dashboard",
}: BreadcrumbProps) {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    const label = segment
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());

    const isLastSegment = index === segments.length - 1;

    return { href, label, isLastSegment };
  });

  breadcrumbs.unshift({
    href: "/",
    label: homeLabel,
    isLastSegment: breadcrumbs.length === 0,
  });

  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbContainer}>
      <ol className={styles.breadcrumbList}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className={styles.breadcrumbItem}>
            {index > 0 && (
              <ChevronRight className={styles.separator} size={16} />
            )}

            {breadcrumb.isLastSegment ? (
              <span className={styles.currentPage}>{breadcrumb.label}</span>
            ) : (
              <Link href={breadcrumb.href} className={styles.breadcrumbLink}>
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

"use client";
import { usePathname } from "next/navigation";

export const usePageTitle = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return "Dashboard";
  }

  const segments = pathname
    .slice(1)
    .split("/")
    .filter((segment) => segment);
  let lastSegment = segments[segments.length - 1] || "";
  lastSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  console.log(lastSegment);
  return lastSegment;
};

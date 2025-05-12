'use client'

import { usePathname } from "next/navigation";

function PageTitle() {
  const pathname = usePathname();

  const formatTitle = () => {
    if(pathname === "/") {
      return "Dashboard";
    }

    return pathname.slice(1).split("/").map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join(" ");
  }

  return (
    <h2>{formatTitle()}</h2>
  )
}
export default PageTitle
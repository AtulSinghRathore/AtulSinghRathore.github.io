"use client";

import { usePathname } from "next/navigation";

export function ShowOnHome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/" ? <>{children}</> : null;
}

export function HideOnHome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/" ? null : <>{children}</>;
}

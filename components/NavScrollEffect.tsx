"use client";

import { useEffect } from "react";

export default function NavScrollEffect({ targetId = "site-navbar" }: { targetId?: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const apply = () => {
      const scrolled = window.scrollY > 8;
      el.classList.toggle("is-scrolled", scrolled);
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);

    return () => {
      window.removeEventListener("scroll", apply as EventListener);
      window.removeEventListener("resize", apply as EventListener);
    };
  }, [targetId]);

  return null;
} 
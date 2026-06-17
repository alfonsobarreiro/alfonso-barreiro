"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const VALID = new Set(["c", "e", "aubergine"]);

export default function BrandSwitch() {
  const params = useSearchParams();
  const brand = params?.get("brand");
  useEffect(() => {
    if (brand && VALID.has(brand)) {
      document.documentElement.setAttribute("data-brand", brand);
    } else {
      document.documentElement.removeAttribute("data-brand");
    }
  }, [brand]);
  return null;
}

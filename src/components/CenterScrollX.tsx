"use client";

import { useEffect, useRef } from "react";

/* Horizontally-scrollable container that centers its initial scroll
   position on mount, so a diagram or table wider than the viewport
   opens on the middle instead of the left edge. The container is
   already bidirectionally scrollable by default (overflow-x: auto);
   this component just picks a friendlier starting position. */
export default function CenterScrollX({
  children,
  className,
  style,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const center = () => {
      const overflow = el.scrollWidth - el.clientWidth;
      if (overflow > 0) el.scrollLeft = overflow / 2;
    };
    center();
    /* Re-center after images inside finish loading (their widths
       aren't known until then). */
    const imgs = Array.from(el.querySelectorAll("img"));
    let pending = imgs.filter((img) => !img.complete).length;
    if (pending === 0) return;
    const onLoad = () => { pending -= 1; if (pending === 0) center(); };
    imgs.forEach((img) => { if (!img.complete) img.addEventListener("load", onLoad); });
    return () => imgs.forEach((img) => img.removeEventListener("load", onLoad));
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      tabIndex={ariaLabel ? 0 : undefined}
      style={{
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

import Image from "next/image";

interface LogoMarkProps {
  size?: number;
  /** "dark" (default) → logo-transparent.png (alpha). "light" → logo-white.png (alpha). */
  variant?: "dark" | "light";
  opacity?: number;
  className?: string;
}

export default function LogoMark({
  size = 40,
  variant = "dark",
  opacity = 1,
  className,
}: LogoMarkProps) {
  // Both PNGs are 2:1 ratio
  const w = Math.round(size * 2);
  const h = Math.round(size);

  return (
    <Image
      src={variant === "light" ? "/logo-white.png" : "/logo-transparent.png"}
      alt="Alfonso Barreiro"
      width={w}
      height={h}
      style={{ display: "block", opacity }}
      className={className}
    />
  );
}

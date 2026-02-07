import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "navbar" | "sidebar";
}

export function Logo({ className = "", variant = "default" }: LogoProps) {
  // Variant Logic (Synced with User App):
  // "navbar" (Light BG/Transparent): mix-blend-multiply removes white bg, keeps black text.
  // "sidebar" / "light" (Dark BG): White Text on Transparent BG.
  //    Step 1: grayscale(1) invert(1) -> White Text, Black BG
  //    Step 2: brightness(2) -> Boost White
  //    Step 3: mix-blend-screen -> Remove Black BG
  let filterClass = "";
  
  if (variant === "navbar") {
    filterClass = "mix-blend-multiply";
  } else if (variant === "sidebar" || variant === "light") {
    filterClass = "grayscale invert brightness-200 mix-blend-screen"; 
  }

  return (
    <Link to="/" className={`block ${className}`}>
        <img 
          src="/logo.parve.png" 
          alt="PARVE" 
          className={`h-10 md:h-12 w-auto object-contain ${filterClass}`}
        />
    </Link>
  );
}

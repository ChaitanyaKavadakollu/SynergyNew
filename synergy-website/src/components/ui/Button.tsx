import { FC, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

// Combining HTML props with Framer Motion props for animated buttons
type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">;

export const Button: FC<MotionButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 focus:ring-gold disabled:opacity-50 disabled:pointer-events-none rounded-lg";
  
  const variants = {
    primary: "bg-gold text-obsidian-900 hover:bg-gold-400 hover:shadow-[0_0_15px_rgba(212,163,115,0.4)]",
    secondary: "bg-teal-gold text-white hover:bg-teal-gold/80",
    outline: "border border-gold text-gold hover:bg-gold/10",
    ghost: "text-slate-300 hover:bg-obsidian-700 hover:text-white",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-transparent hover:border-red-500/30",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

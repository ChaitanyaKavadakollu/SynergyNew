import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "error" | "info" | "default" | "gold" | "teal";
}

export const Badge: FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variants = {
    default: "bg-obsidian-700 text-slate-300 border-obsidian-600",
    success: "bg-[#38B000]/10 text-[#38B000] border-[#38B000]/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    gold: "bg-gold/10 text-gold border-gold/20",
    teal: "bg-teal-gold/10 text-teal-gold border-teal-gold/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

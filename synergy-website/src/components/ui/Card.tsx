import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

type MotionCardProps = CardProps & HTMLMotionProps<"div">;

export const Card: FC<MotionCardProps> = ({
  className,
  hoverEffect = false,
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={cn(
        "bg-obsidian-800 border border-obsidian-700 rounded-2xl overflow-hidden",
        hoverEffect && "hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

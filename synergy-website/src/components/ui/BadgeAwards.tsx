import { Trophy, Star, TrendingUp } from "lucide-react";

interface BadgeAwardsProps {
  type: "gold" | "silver" | "rising";
  className?: string;
}

export function BadgeAwards({ type, className = "" }: BadgeAwardsProps) {
  const styles = {
    gold: {
      bg: "bg-yellow-500/10 border-yellow-500/20",
      text: "text-yellow-500",
      icon: <Trophy className="w-3.5 h-3.5 mr-1.5" />,
      label: "Gold Mentor",
    },
    silver: {
      bg: "bg-slate-300/10 border-slate-300/20",
      text: "text-slate-300",
      icon: <Star className="w-3.5 h-3.5 mr-1.5" />,
      label: "Silver Mentor",
    },
    rising: {
      bg: "bg-teal-500/10 border-teal-500/20",
      text: "text-teal-400",
      icon: <TrendingUp className="w-3.5 h-3.5 mr-1.5" />,
      label: "Rising Mentor",
    },
  };

  const current = styles[type];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${current.bg} ${current.text} ${className}`}
    >
      {current.icon}
      {current.label}
    </span>
  );
}

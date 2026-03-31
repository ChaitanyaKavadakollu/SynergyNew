import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Synergy",
  description: "Connect with your mentors and mentees.",
};

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-6rem)] -mt-4 -mb-6 -mx-4 lg:-mx-8 overflow-hidden bg-obsidian-900 border border-obsidian-700/50 rounded-xl flex flex-col pt-4 px-4 pb-0 mb-4 ml-4">
      {children}
    </div>
  );
}

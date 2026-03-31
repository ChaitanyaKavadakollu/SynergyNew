import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-obsidian-700 bg-obsidian-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded flex items-center justify-center font-display font-bold text-obsidian-900">
              S
            </div>
            <span className="font-display font-bold text-xl tracking-tight">SYNERGY</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="#problem" className="hover:text-gold transition-colors">
              Challenges
            </Link>
            <Link href="#value" className="hover:text-gold transition-colors">
              Solutions
            </Link>
            <Link href="#journey" className="hover:text-gold transition-colors">
              Journey
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gold border border-gold/30 px-5 py-2 rounded-full hover:bg-gold/10 hover:border-gold transition-all font-semibold"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gold text-obsidian-900 px-5 py-2 rounded-full hover:bg-gold/90 transition-all font-semibold hover:shadow-[0_0_20px_rgba(212,163,115,0.4)]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

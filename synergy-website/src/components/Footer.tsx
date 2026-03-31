import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-obsidian-900 border-t border-obsidian-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-bold mb-6 text-gold uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link href="#" className="hover:text-gold transition-colors">Skill Ledger</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Verification Flow</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Hiring Portal</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-gold uppercase tracking-widest text-xs">Features</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link href="#" className="hover:text-gold transition-colors">LMS Integration</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Growth Analytics</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Badges & NFTs</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Portfolio Export</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-gold uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link href="#" className="hover:text-gold transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Whitepaper</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-gold uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-obsidian-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gold/20 rounded flex items-center justify-center font-display font-bold text-xs text-gold">S</div>
            <span className="text-sm font-bold opacity-80">© 2024 Synergy Protocol. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-muted hover:text-gold transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted hover:text-gold transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

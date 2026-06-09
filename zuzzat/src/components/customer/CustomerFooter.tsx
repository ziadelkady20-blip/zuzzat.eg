import Link from "next/link";
import ZuzzatLogo from "@/components/ui/ZuzzatLogo";

export default function CustomerFooter() {
  return (
    <footer className="bg-gray-900 text-white pt-14 pb-8 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ZuzzatLogo size={36} variant="white" />
              <span className="font-black text-2xl" style={{ fontFamily:"'Outfit',sans-serif" }}>ZUZZAT</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">Stay Cool, Drink Better. Your favourite beverage destination for premium drinks and amazing vibes.</p>
            <div className="flex gap-3">
              {["📘","📸","🎵","💬"].map((icon, i) => (
                <button key={i} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm transition-colors">{icon}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm mb-4 text-white/80">Quick Links</p>
            {[{ href:"/home",l:"Home"},{ href:"/menu",l:"Menu"},{ href:"/offers",l:"Offers"},{ href:"/loyalty",l:"Loyalty"},{href:"/about",l:"About"}].map(l=>(
              <Link key={l.href} href={l.href} className="block text-gray-400 hover:text-white text-sm py-1 transition-colors">{l.l}</Link>
            ))}
          </div>
          <div>
            <p className="font-semibold text-sm mb-4 text-white/80">Contact</p>
            <p className="text-gray-400 text-sm py-1">📍 123 Tahrir Square, Cairo</p>
            <p className="text-gray-400 text-sm py-1">📞 010-ZUZZAT-01</p>
            <p className="text-gray-400 text-sm py-1">✉️ hello@zuzzat.com</p>
            <p className="text-gray-400 text-sm py-1 mt-2">🕐 Daily 9AM – 12AM</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">© 2026 ZUZZAT Coffee Shop. All rights reserved.</p>
          <p className="text-gray-500 text-xs">Made with ❤️ in Egypt 🇪🇬</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl text-ivory mb-4">Keep Looking Flowers</p>
          <p className="text-sm leading-relaxed text-ivory/60">
            Luxury floral arrangements for life's most beautiful moments.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-ivory/40 mb-4">Navigate</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/shop" className="hover:text-ivory transition-colors">Shop</Link></li>
            <li><Link href="/shop?category=bouquet" className="hover:text-ivory transition-colors">Bouquets</Link></li>
            <li><Link href="/shop?category=arrangement" className="hover:text-ivory transition-colors">Arrangements</Link></li>
            <li><Link href="/shop?category=accessory" className="hover:text-ivory transition-colors">Accessories</Link></li>
            <li><Link href="/contact" className="hover:text-ivory transition-colors">Custom Orders</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-ivory/40 mb-4">Get in Touch</p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/contact" className="hover:text-ivory transition-colors">
                Request a Custom Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-ivory/30">
          <p>© {new Date().getFullYear()} Keep Looking Flowers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

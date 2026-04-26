"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-sm border-b border-blush">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-charcoal hover:text-dusty-rose transition-colors"
        >
          Keep Looking Flowers
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/shop"
            className="text-sm tracking-widest uppercase text-charcoal-light hover:text-charcoal transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className="text-sm tracking-widest uppercase text-charcoal-light hover:text-charcoal transition-colors"
          >
            Custom Orders
          </Link>
          <Link
            href="/cart"
            className="relative text-sm tracking-widest uppercase text-charcoal-light hover:text-charcoal transition-colors"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-dusty-rose text-ivory text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

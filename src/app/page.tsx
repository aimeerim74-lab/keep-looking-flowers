import Link from "next/link";
import { getFeaturedProducts } from "@/lib/sanity";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export const revalidate = 3600;

export default async function HomePage() {
  let featured: Product[] = [];
  try {
    featured = await getFeaturedProducts();
  } catch {
    // Sanity not yet configured
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blush via-ivory to-sage/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory/40 z-10" />

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <p className="animate-fade-up text-xs tracking-[0.3em] uppercase text-charcoal-light mb-6">
            Luxury Floristry
          </p>
          <h1 className="animate-fade-up-delay font-serif text-6xl md:text-8xl text-charcoal leading-none mb-8">
            Keep Looking
            <br />
            <em>Flowers</em>
          </h1>
          <p className="animate-fade-up-delay-2 text-base md:text-lg text-charcoal-light max-w-md mx-auto mb-10 leading-relaxed">
            Thoughtfully crafted arrangements for life's most beautiful moments.
          </p>
          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-10 py-3.5 bg-charcoal text-ivory text-sm tracking-widest uppercase hover:bg-dusty-rose transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-10 py-3.5 border border-charcoal text-charcoal text-sm tracking-widest uppercase hover:bg-charcoal hover:text-ivory transition-colors duration-300"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
              Curated Collection
            </p>
            <h2 className="font-serif text-5xl text-charcoal">Featured Arrangements</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="text-sm tracking-widest uppercase text-charcoal border-b border-charcoal pb-0.5 hover:text-dusty-rose hover:border-dusty-rose transition-colors"
            >
              View All
            </Link>
          </div>
        </section>
      )}

      {/* About Strip */}
      <section className="bg-blush/30 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-6">Our Story</p>
          <h2 className="font-serif text-5xl text-charcoal mb-8">
            Flowers that speak
            <br />
            <em>without words</em>
          </h2>
          <p className="text-base text-charcoal-light leading-relaxed mb-8">
            Every arrangement at Keep Looking Flowers is crafted with intention — selecting
            only the finest seasonal blooms to create something truly memorable. Whether
            it's an intimate bouquet or an elaborate event installation, we pour care
            into every petal.
          </p>
          <Link
            href="/contact"
            className="text-sm tracking-widest uppercase text-charcoal border-b border-charcoal pb-0.5 hover:text-dusty-rose hover:border-dusty-rose transition-colors"
          >
            Work with us
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Bouquets", category: "bouquet", bg: "bg-blush/40" },
            { label: "Arrangements", category: "arrangement", bg: "bg-sage/30" },
            { label: "Accessories", category: "accessory", bg: "bg-dusty-rose/20" },
          ].map(({ label, category, bg }) => (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className={`group ${bg} aspect-square flex items-end p-8 hover:opacity-90 transition-opacity`}
            >
              <div>
                <p className="font-serif text-3xl text-charcoal mb-1 group-hover:text-dusty-rose transition-colors">
                  {label}
                </p>
                <p className="text-xs tracking-widest uppercase text-charcoal-light">
                  Shop →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

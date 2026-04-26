"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts } from "@/lib/sanity";
import ProductCard from "@/components/ProductCard";
import type { Product, ProductCategory } from "@/lib/types";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Bouquets", value: "bouquet" },
  { label: "Arrangements", value: "arrangement" },
  { label: "Accessories", value: "accessory" },
];

export default function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    (searchParams.get("category") as ProductCategory) || "all"
  );

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-14 flex-wrap">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            className={`px-6 py-2 text-xs tracking-widest uppercase transition-colors duration-200 ${
              activeCategory === value
                ? "bg-charcoal text-ivory"
                : "border border-charcoal/20 text-charcoal-light hover:border-charcoal hover:text-charcoal"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-blush/30 aspect-[4/5] mb-4" />
              <div className="h-3 bg-blush/50 w-1/3 mb-2" />
              <div className="h-5 bg-blush/50 w-2/3 mb-2" />
              <div className="h-3 bg-blush/30 w-1/4" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-serif text-3xl text-charcoal mb-4">Coming Soon</p>
          <p className="text-charcoal-light text-sm">
            New arrangements are on their way. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

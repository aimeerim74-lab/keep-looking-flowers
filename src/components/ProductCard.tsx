import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl =
    product.images?.[0]
      ? urlFor(product.images[0]).width(600).height(750).fit("crop").url()
      : null;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="overflow-hidden bg-blush/30 aspect-[4/5] mb-4 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-charcoal-light text-sm">No image</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs tracking-widest uppercase text-charcoal-light">
          {product.category}
        </p>
        <h3 className="font-serif text-xl text-charcoal group-hover:text-dusty-rose transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-charcoal-light">
          {product.purchaseType === "quote"
            ? "Price on request"
            : product.price
            ? `$${product.price.toFixed(2)}`
            : "—"}
        </p>
      </div>
    </Link>
  );
}

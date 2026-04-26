"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, urlFor } from "@/lib/sanity";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/types";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    getProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-blush/30 aspect-[4/5]" />
          <div className="space-y-4 pt-4">
            <div className="h-4 bg-blush/30 w-1/4" />
            <div className="h-10 bg-blush/30 w-3/4" />
            <div className="h-4 bg-blush/30 w-1/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32">
        <p className="font-serif text-3xl text-charcoal mb-4">Product not found</p>
        <button onClick={() => router.push("/shop")} className="text-sm text-charcoal-light underline">
          Back to shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, fulfillment);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <button
        onClick={() => router.back()}
        className="text-xs tracking-widest uppercase text-charcoal-light hover:text-charcoal transition-colors mb-10 inline-block"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-blush/20">
            {product.images?.[selectedImage] ? (
              <Image
                src={urlFor(product.images[selectedImage]).width(800).height(1000).fit("crop").url()}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-charcoal-light text-sm">
                No image
              </div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-20 overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-charcoal" : "border-transparent"
                  }`}
                >
                  <Image
                    src={urlFor(img).width(128).height(160).fit("crop").url()}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:pt-8">
          <p className="text-xs tracking-widest uppercase text-charcoal-light mb-3">
            {product.category}
          </p>
          <h1 className="font-serif text-5xl text-charcoal mb-4">{product.name}</h1>
          <p className="text-xl text-charcoal-light mb-8">
            {product.purchaseType === "quote"
              ? "Price on request"
              : product.price
              ? `$${product.price.toFixed(2)}`
              : "—"}
          </p>

          <p className="text-base text-charcoal-light leading-relaxed mb-10">
            {product.description}
          </p>

          {product.purchaseType === "instant" ? (
            <>
              {/* Fulfillment selector */}
              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase text-charcoal-light mb-3">
                  Fulfillment
                </p>
                <div className="flex gap-3">
                  {(["delivery", "pickup"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFulfillment(opt)}
                      className={`px-5 py-2 text-sm capitalize transition-colors ${
                        fulfillment === opt
                          ? "bg-charcoal text-ivory"
                          : "border border-charcoal/30 text-charcoal-light hover:border-charcoal"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-4 bg-charcoal text-ivory text-sm tracking-widest uppercase hover:bg-dusty-rose disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {!product.inStock
                  ? "Sold Out"
                  : added
                  ? "Added to Cart ✓"
                  : "Add to Cart"}
              </button>
            </>
          ) : (
            <a
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              className="block w-full py-4 border border-charcoal text-charcoal text-sm tracking-widest uppercase text-center hover:bg-charcoal hover:text-ivory transition-colors duration-300"
            >
              Request a Quote
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

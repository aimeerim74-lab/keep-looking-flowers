"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { urlFor } from "@/lib/sanity";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-serif text-5xl text-charcoal mb-6">Your cart is empty</h1>
        <p className="text-charcoal-light mb-10">
          Discover our arrangements and find something beautiful.
        </p>
        <Link
          href="/shop"
          className="px-10 py-3.5 bg-charcoal text-ivory text-sm tracking-widest uppercase hover:bg-dusty-rose transition-colors duration-300 inline-block"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-5xl text-charcoal mb-14">Your Cart</h1>

      <div className="divide-y divide-blush/50">
        {items.map(({ product, quantity, fulfillment }) => {
          const imageUrl = product.images?.[0]
            ? urlFor(product.images[0]).width(200).height(250).fit("crop").url()
            : null;

          return (
            <div key={product._id} className="py-8 flex gap-6">
              <div className="relative w-20 h-24 flex-shrink-0 bg-blush/20 overflow-hidden">
                {imageUrl && (
                  <Image src={imageUrl} alt={product.name} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl text-charcoal mb-1">{product.name}</h3>
                <p className="text-xs text-charcoal-light capitalize mb-3">
                  {fulfillment}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(product._id, quantity - 1)}
                    className="w-7 h-7 border border-charcoal/20 text-charcoal flex items-center justify-center hover:border-charcoal transition-colors"
                  >
                    −
                  </button>
                  <span className="text-sm w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="w-7 h-7 border border-charcoal/20 text-charcoal flex items-center justify-center hover:border-charcoal transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="text-charcoal font-medium">
                  ${((product.price ?? 0) * quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(product._id)}
                  className="text-xs text-charcoal-light hover:text-dusty-rose transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-blush/50">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm tracking-widest uppercase text-charcoal-light">Total</p>
          <p className="font-serif text-3xl text-charcoal">${total().toFixed(2)}</p>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 bg-charcoal text-ivory text-sm tracking-widest uppercase hover:bg-dusty-rose disabled:opacity-50 transition-colors duration-300"
        >
          {loading ? "Redirecting..." : "Proceed to Checkout"}
        </button>
        <p className="text-xs text-charcoal-light text-center mt-4">
          Secure checkout via Stripe
        </p>
      </div>
    </div>
  );
}

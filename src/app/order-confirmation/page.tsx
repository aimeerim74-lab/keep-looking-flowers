"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store";

export default function OrderConfirmationPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-6">
        Order Confirmed
      </p>
      <h1 className="font-serif text-6xl text-charcoal mb-6">
        Thank you for
        <br />
        <em>your order</em>
      </h1>
      <p className="text-charcoal-light leading-relaxed mb-10">
        We've received your order and will prepare it with care. You'll receive
        a confirmation email shortly with all the details.
      </p>
      <Link
        href="/shop"
        className="px-10 py-3.5 bg-charcoal text-ivory text-sm tracking-widest uppercase hover:bg-dusty-rose transition-colors duration-300 inline-block"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

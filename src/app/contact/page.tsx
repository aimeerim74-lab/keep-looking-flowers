import { Suspense } from "react";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
          Get in Touch
        </p>
        <h1 className="font-serif text-6xl text-charcoal mb-4">Custom Orders</h1>
        <p className="text-charcoal-light leading-relaxed">
          Tell us about your vision and we'll create something extraordinary together.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse bg-blush/20" />}>
        <ContactForm />
      </Suspense>
    </div>
  );
}

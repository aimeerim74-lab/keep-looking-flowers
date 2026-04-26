import { Suspense } from "react";
import ShopContent from "./ShopContent";

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-3">
          Our Collection
        </p>
        <h1 className="font-serif text-6xl text-charcoal">Shop</h1>
      </div>
      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent />
      </Suspense>
    </div>
  );
}

function ShopSkeleton() {
  return (
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
  );
}

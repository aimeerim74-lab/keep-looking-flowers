export type ProductCategory = "bouquet" | "arrangement" | "accessory";
export type PurchaseType = "instant" | "quote";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price?: number;
  description: string;
  images: SanityImage[];
  purchaseType: PurchaseType;
  inStock: boolean;
  featured: boolean;
}

export interface SanityImage {
  _key?: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  fulfillment: "delivery" | "pickup";
}

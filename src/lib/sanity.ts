import { createClient } from "next-sanity";
import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const isConfigured = Boolean(projectId && projectId !== "your_project_id_here");

export const client = createClient({
  projectId: isConfigured ? projectId! : "a0000000",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export async function getFeaturedProducts() {
  if (!isConfigured) return [];
  return client.fetch(
    `*[_type == "product" && featured == true && inStock == true] | order(_createdAt desc)[0...4] {
      _id, name, "slug": slug.current, category, price, description, images, purchaseType, inStock, featured
    }`
  );
}

export async function getAllProducts() {
  if (!isConfigured) return [];
  return client.fetch(
    `*[_type == "product" && inStock == true] | order(_createdAt desc) {
      _id, name, "slug": slug.current, category, price, description, images, purchaseType, inStock, featured
    }`
  );
}

export async function getProductBySlug(slug: string) {
  if (!isConfigured) return null;
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, "slug": slug.current, category, price, description, images, purchaseType, inStock, featured
    }`,
    { slug }
  );
}

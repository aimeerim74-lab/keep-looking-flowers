import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Bouquet", value: "bouquet" },
          { title: "Arrangement", value: "arrangement" },
          { title: "Accessory", value: "accessory" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "purchaseType",
      title: "Purchase Type",
      type: "string",
      options: {
        list: [
          { title: "Instant Buy (has price)", value: "instant" },
          { title: "Request a Quote (no fixed price)", value: "quote" },
        ],
        layout: "radio",
      },
      initialValue: "instant",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Leave blank for quote-only items",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", media: "images.0", price: "price" },
    prepare({ title, media, price }) {
      return {
        title,
        media,
        subtitle: price ? `$${price}` : "Price on request",
      };
    },
  },
});

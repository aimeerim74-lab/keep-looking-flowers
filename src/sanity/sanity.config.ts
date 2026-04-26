import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { productSchema } from "./schema/product";

export default defineConfig({
  name: "keep-looking-flowers",
  title: "Keep Looking Flowers",
  projectId: "usaj2u9e",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [productSchema],
  },
});

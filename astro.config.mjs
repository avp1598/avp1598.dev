import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { astroImageTools } from "astro-imagetools";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), astroImageTools],
});

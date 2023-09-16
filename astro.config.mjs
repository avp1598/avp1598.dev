import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";
import compress from "astro-compress";
import purgecss from "astro-purgecss";
import serviceWorker from "astrojs-service-worker";
import partytown from "@astrojs/partytown";
import robotsTxt from "astro-robots-txt";

import webmanifest from "astro-webmanifest";

// https://astro.build/config
export default defineConfig({
  site: "https://avp1598.dev",
  integrations: [
    react(),
    tailwind(),
    astroImageTools,
    compress(),
    purgecss(),
    serviceWorker(),
    partytown(),
    robotsTxt(),
    webmanifest({
      name: "avp1598.dev",
      short_name: "avp1598.dev",
      description: "Personal website of Aditya Veer Parmar",
    }),
  ],
});

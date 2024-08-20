// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        services: resolve(__dirname, "services.html"),
        colours: resolve(__dirname, "colours.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        "cross-ref": resolve(__dirname, "cross-ref.html"),
        404: resolve(__dirname, "404.html"),
      },
    },
  },
});

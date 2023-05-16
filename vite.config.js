import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

import { dependencies } from "./package.json";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key, i) => {
    if (["react", "react-router-dom", "react-dom"].includes(key)) return;
    chunks[
      i +
        makeid(Math.ceil(Math.random() * (10 - 6) + 6)) +
        (i + Math.ceil(Math.random() * (10 - 6) + 6))
    ] = [key];
  });
  return chunks;
}

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react(),
      laravel({
        input: [
          "resources/sass/app.scss",
          "resources/js/index.jsx",
          "resources/js/webview/index.jsx",
        ],
        refresh: true,
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, "");
          },
        },
      ],
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-router-dom", "react-dom"],
            ...renderChunks(dependencies),
          },
        },
      },
    },
  });
};

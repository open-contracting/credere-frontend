import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: 3000,
      host: process.env.VITE_HOST ?? "localhost",
    },
    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        typescript: true,
      }),
    ],
  });
};

import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig(config => {
  return {
    server: {
    proxy: {
      '/api': {
        target: 'http://192.168.3.235:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [reactRouter() ,  tailwindcss() , tsconfigPaths()],
  ssr : {
    noExternal : [/@syncfusion/]
  }
  };
});

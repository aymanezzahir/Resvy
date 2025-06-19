import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "resvy",
  project: "javascript-react",

  // An auth token is required for uploading source maps.
  authToken: "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"
  
};

export default defineConfig(config => {
  return {
  plugins: [reactRouter(),sentryReactRouter(sentryConfig, config) , tailwindcss() , tsconfigPaths()],
  ssr : {
    noExternal : [/@syncfusion/]
  }
  };
});

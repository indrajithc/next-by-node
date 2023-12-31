/** @type {import('next').NextConfig} */

const config = require("./config");

const { domains, deviceSizes } = config.image || {};

const serverRuntimeConfig = {
  ENVIRONMENT: config.env,
  API_HOST: config.appApiHost,
};

const nextConfig = {
  /* config options here */
  images: {
    ...(domains ? { domains } : {}),
    // ...(imageSizes ? ({ imageSizes }) : {}),
    ...(deviceSizes ? { deviceSizes } : {}),
    loader: "default",
  },
  serverRuntimeConfig,
};

module.exports = nextConfig;

// Don't delete this console log, useful to see the commerce config in site deployments
if (config.isProduction) {
  console.info("next.config.js", JSON.stringify(module.exports, null, 2));
}

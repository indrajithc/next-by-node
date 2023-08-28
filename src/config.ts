/**
 * Basic config
 */

const outputDir: string = process.env.OUTPUT_DIR || "./output";

const rootDir: string = __dirname;

export const systemConstants = {
  CONFIG_JSON: "runtime.config.json",
};
export default {
  outputDir,
  rootDir,
};

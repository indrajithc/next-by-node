/**
 * App config
 */

import fs from "fs";
import path from "path";
import config, { systemConstants } from "./config";

type AppConfig = () => {
  outputDir: string;
};

export const getAppConfig: AppConfig = () => {
  const jsonConfig = fs.readFileSync(path.join(config.rootDir, systemConstants.CONFIG_JSON));
  return JSON.parse(jsonConfig.toString());
};

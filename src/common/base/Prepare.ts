/**
 * Prepare the app before start
 */

import fs from "fs";
import fse from "fs-extra";
import path from "path";

import readlineSync from "readline-sync";

import config, { systemConstants } from "@app/config";
import { getAppConfig } from "@app/appConfig";
import { exit } from "process";

const prepareConfiguration = () => {
  const configJson = JSON.stringify(config);
  fs.writeFileSync(path.join(config.rootDir, systemConstants.CONFIG_JSON), configJson);
};

const prepareOutputDirectory = () => {
  const appConfig = getAppConfig();
  const outputDirectory = appConfig.outputDir;

  if (fs.existsSync(outputDirectory)) {
    const files = fs.readdirSync(outputDirectory);
    if (files.length > 0) {
      const result = readlineSync.question("[>]:: Output folder is not empty, would you like to clean and proceed (Y): ");
      if (result.toLowerCase() === "y") {
        fse.emptyDirSync(outputDirectory);
      } else {
        console.info("Existing the app");
        exit();
      }
    }
  } else {
    fs.mkdirSync(outputDirectory);
  }
};

export default () => {
  try {
    prepareConfiguration();
    prepareOutputDirectory();
  } catch (error) {
    console.error("Preparing app failed");
    throw error;
  }
};

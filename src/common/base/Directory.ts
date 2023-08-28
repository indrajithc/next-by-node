/**
 * Directory class
 *
 * The basic file operations
 */

import fs from "fs";
import path from "path";

import { getAppConfig } from "@app/appConfig";

class Directory {
  workingDirectoryBase: string;
  parentDirectory: string;
  name: string;

  constructor(protected readonly directory: string) {
    const config = getAppConfig();
    this.workingDirectoryBase = config.outputDir;

    this.directory = path.join(this.workingDirectoryBase, directory);

    this.parentDirectory = path.dirname(this.directory);
    this.name = path.basename(this.directory);

    if (!this.isDirectoryExists()) {
      fs.mkdirSync(this.directory);
    }
  }

  isDirectoryExists() {
    try {
      return fs.existsSync(this.directory);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  createDirectory() {}
}

export default Directory;

/**
 * File class
 *
 * The basic file operations
 */

import fs from "fs";
import path from "path";

import { getAppConfig } from "@app/appConfig";

class File {
  workingDirectoryBase: string;
  directory: string;
  name: string;

  constructor(
    protected readonly filePath: string,
    content?: string
  ) {
    const config = getAppConfig();
    this.workingDirectoryBase = config.outputDir;

    this.filePath = path.join(this.workingDirectoryBase, filePath);
    this.directory = path.dirname(this.filePath);
    this.name = path.basename(this.filePath);

    if (!this.isFileExists()) {
      fs.writeFileSync(this.filePath, content || "");
    }
  }

  isFileExists() {
    try {
      return fs.existsSync(this.filePath);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  createFile() {}
}

export default File;

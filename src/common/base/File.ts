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
  content: string;

  constructor(
    protected readonly filePath: string,
    fileContent?: string
  ) {
    const config = getAppConfig();
    this.workingDirectoryBase = config.outputDir;

    this.filePath = path.join(this.workingDirectoryBase, filePath);
    this.directory = path.dirname(this.filePath);
    this.name = path.basename(this.filePath);
    this.content = fileContent || "";

    if (!File.isFileExists(this.filePath)) {
      fs.writeFileSync(this.filePath, fileContent || "");
    } else {
      this.content = File.readFile(this.filePath);
    }
  }

  static isFileExists(filePath: string) {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static readFile(filePath: string) {
    const dataContent = fs.readFileSync(filePath);
    return dataContent.toString();
  }

  getContent() {
    return this.content;
  }

  createFile() {}
}

export default File;

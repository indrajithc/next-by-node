/**
 * Folder class
 */

import path from "path";

import Directory from "@base/Directory";
import File from "@base/File";

import config from "@app/config";
import { getAppConfig } from "@app/appConfig";

type FolderChildrenConfiguration = {
  name: string;
  content?: string;
  contentPath?: string;
  isDirectory?: boolean;
  children?: FolderChildrenConfiguration[];
};

type Configuration = {
  assetsDir: string;
  name: string;
  children: FolderChildrenConfiguration[];
};

class Folder {
  assetDirectory: string;
  outputDir: string;

  constructor(
    readonly configuration: Configuration,
    readonly options: { assetPath?: string }
  ) {
    const rootDir = config.rootDir;
    const appConfig = getAppConfig();

    this.outputDir = appConfig.outputDir;
    this.assetDirectory = path.join(rootDir, options.assetPath || "", this.configuration.assetsDir);

    this.initiate();
  }

  process(folderConfiguration: FolderChildrenConfiguration) {
    const { name, children, isDirectory, content, contentPath } = folderConfiguration;

    if (isDirectory || Array.isArray(children)) {
      new Directory(name);
      if (Array.isArray(children)) {
        children.forEach((child) => {
          const pathname = path.join(name, child.name);
          this.process({ ...child, name: pathname });
        });
      }
    } else {
      let dataContent = content;
      if (!content && contentPath) {
        const contentFilePath = path.join(this.assetDirectory, contentPath);
        if (File.isFileExists(contentFilePath)) {
          dataContent = File.readFile(contentFilePath);
        }
      }
      new File(name, dataContent);
    }
  }

  initiate() {
    const { name, children } = this.configuration;
    this.process({ children, name });
  }
}

export default Folder;

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
  relativeDirectory: string;
  isDirectory?: boolean;
  children?: FolderChildrenConfiguration[];
};

type Configuration = {
  assetsDir: string;
  name: string;
  relativeDirectory: string;
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
    const { name, children, isDirectory, content, relativeDirectory } = folderConfiguration;

    if (isDirectory || Array.isArray(children)) {
      new Directory(name);
      if (Array.isArray(children)) {
        children.forEach((child) => {
          const pathname = path.join(name, child.name);
          const directory = path.join(relativeDirectory, child.relativeDirectory);
          this.process({ ...child, name: pathname, relativeDirectory: directory });
        });
      }
    } else {
      let dataContent = content;
      if (!content && relativeDirectory) {
        const contentFilePath = path.join(this.assetDirectory, relativeDirectory);
        if (File.isFileExists(contentFilePath)) {
          dataContent = File.readFile(contentFilePath);
        }
      }
      new File(name, dataContent);
    }
  }

  initiate() {
    const { name, relativeDirectory, children } = this.configuration;
    this.process({ children, name, relativeDirectory });
  }
}

export default Folder;

/**
 * Folder class
 */

import path from "path";

import Directory from "@base/Directory";
import File from "@base/File";
import Progress from "@base/Progress";

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

type FolderDynamicData = {
  global: {
    [key: string]: string;
  };
};

type FolderOptions = {
  assetPath?: string;
  dynamicData?: FolderDynamicData;
};

class Folder {
  assetDirectory: string;
  outputDir: string;
  dynamicData?: FolderDynamicData;
  progress: Progress;

  constructor(
    readonly configuration: Configuration,
    readonly options: FolderOptions
  ) {
    const rootDir = config.rootDir;
    const appConfig = getAppConfig();

    this.progress = new Progress(69);
    this.outputDir = appConfig.outputDir;
    this.assetDirectory = path.join(rootDir, options.assetPath || "", this.configuration.assetsDir);
    this.dynamicData = options.dynamicData;
    this.initiate();
  }

  replaceContent(input?: string): string {
    let dataContent = input;
    try {
      const dynamicDataMap = this.dynamicData?.global || {};
      if (Object.keys(dynamicDataMap).length > 0) {
        Object.keys(dynamicDataMap).forEach((each) => {
          dataContent = dataContent?.replaceAll(each, dynamicDataMap[each]);
        });
      }
    } catch (error) {}
    return dataContent || "";
  }

  process(folderConfiguration: FolderChildrenConfiguration) {
    const { name: originalName, children, isDirectory, content, relativeDirectory } = folderConfiguration;

    const name = this.replaceContent(originalName);

    if (isDirectory || Array.isArray(children)) {
      new Directory(name);
      if (Array.isArray(children)) {
        children.forEach((child) => {
          const pathname = path.join(originalName, child.name);
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

      dataContent = this.replaceContent(dataContent);
      new File(name, dataContent);
    }
  }

  testFolderStructure() {}

  initiate() {
    const { name, relativeDirectory, children } = this.configuration;
    this.progress.start();
    this.process({ children, name, relativeDirectory });
    this.progress.stop();
  }
}

export default Folder;

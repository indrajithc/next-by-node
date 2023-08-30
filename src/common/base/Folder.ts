/**
 * Folder class
 */

import path from "path";

import Directory from "@base/Directory";
import File from "@base/File";
import Progress from "@base/Progress";
import Page from "@base/Page";
import FolderBase from "@base/FolderBase";

import config from "@app/config";
import { getAppConfig } from "@app/appConfig";

import { FolderConfiguration, FolderOptions, FolderChildrenConfiguration, DynamicModules } from "@lib/types";

class Folder extends FolderBase {
  configuration: FolderConfiguration;
  dynamicModules?: DynamicModules;
  assetDirectory: string;
  outputDir: string;
  progress: Progress;

  constructor(
    readonly payload: { configuration: FolderConfiguration; dynamicModules?: DynamicModules },
    readonly options: FolderOptions
  ) {
    super(options.dynamicData);
    const rootDir = config.rootDir;
    const appConfig = getAppConfig();

    this.configuration = payload.configuration;
    this.dynamicModules = payload.dynamicModules;
    this.progress = new Progress(69);
    this.outputDir = appConfig.outputDir;
    this.assetDirectory = path.join(rootDir, options.assetPath || "", this.configuration.assetsDir);
    this.initiate();
  }

  process(folderConfiguration: FolderChildrenConfiguration) {
    const { name: originalName, children, isDirectory, content, relativeDirectory, execute } = folderConfiguration;

    const name = this.replaceContent(originalName);

    if (isDirectory || Array.isArray(children)) {
      new Directory(name);
    }
    if (execute) {
      this.getDynamicFleContent({ ...folderConfiguration, name });
    }

    if (Array.isArray(children)) {
      children.forEach((child) => {
        const pathname = path.join(originalName, child.name);
        const directory = path.join(relativeDirectory, child.relativeDirectory);
        this.process({ ...child, name: pathname, relativeDirectory: directory });
      });
    } else if (!execute && !isDirectory) {
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

  getDynamicFleContent(folderConfiguration: FolderChildrenConfiguration) {
    const { name, relativeDirectory, type, moduleId } = folderConfiguration;

    try {
      const contentFilePath = path.join(this.assetDirectory, relativeDirectory);

      const module = this.dynamicModules && moduleId && this.dynamicModules[moduleId];

      switch (type) {
        case "page":
          if (module) {
            new Page(name, contentFilePath, module, { assetDirectory: this.assetDirectory, dynamicData: this.dynamicData });
          }
          break;
      }
    } catch (error) {
      console.error(error);
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

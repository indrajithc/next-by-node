/**
 * Page class
 */
import path from "path";

import Directory from "@base/Directory";
import File from "@base/File";

import { DynamicModule, PageDirectory, FolderDynamicData, DynamicModuleHandlers } from "@lib/types";

class Page {
  directory: PageDirectory[];
  assetDirectory: string;
  dynamicData?: FolderDynamicData;
  handlers: DynamicModuleHandlers;

  constructor(
    readonly name: string,
    readonly filePath: string,
    readonly module: DynamicModule,
    readonly options: { assetDirectory: string; dynamicData?: FolderDynamicData }
  ) {
    if (!module) {
      throw new Error("Module missing");
    }

    const { default: configuration, handlers } = module;

    this.directory = configuration.directory as PageDirectory[];
    this.handlers = handlers;
    this.assetDirectory = options?.assetDirectory;
    this.dynamicData = options?.dynamicData;
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

  process(pageDirectory: PageDirectory) {
    const { name: originalName, children, handler, relativeDirectory } = pageDirectory;

    const name = this.replaceContent(originalName);

    if (Array.isArray(children)) {
      new Directory(name);
    }

    if (Array.isArray(children)) {
      children.forEach((child) => {
        const pathname = path.join(name, child.name);
        const directory = path.join(relativeDirectory, child.relativeDirectory);
        this.process({ ...child, name: pathname, relativeDirectory: directory });
      });
    } else {
      let dataContent = "";

      try {
        if (handler && this.module) {
          const fileHandler = this.handlers[handler];
          dataContent = fileHandler();
        }
      } catch (error) {
        console.error(error);
      }

      dataContent = this.replaceContent(dataContent);
      new File(name, dataContent);
    }
  }

  initiate() {
    this.process({ children: this.directory, name: this.name, relativeDirectory: this.filePath });
  }
}

export default Page;

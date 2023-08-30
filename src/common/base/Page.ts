/**
 * Page class
 */
import path from "path";

import Directory from "@base/Directory";
import File from "@base/File";
import FolderBase from "@base/FolderBase";

import { DynamicModule, PageDirectory, FolderDynamicData, DynamicModuleHandlers } from "@lib/types";

class Page extends FolderBase {
  directory: PageDirectory[];
  assetDirectory: string;
  handlers: DynamicModuleHandlers;

  constructor(
    readonly name: string,
    readonly filePath: string,
    readonly module: DynamicModule,
    readonly options: { assetDirectory: string; dynamicData?: FolderDynamicData }
  ) {
    super(options?.dynamicData);
    if (!module) {
      throw new Error("Module missing");
    }

    const { default: configuration, handlers } = module;

    this.directory = configuration.directory as PageDirectory[];
    this.handlers = handlers;
    this.assetDirectory = options?.assetDirectory;
    this.initiate();
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

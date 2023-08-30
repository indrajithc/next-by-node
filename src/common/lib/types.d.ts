export interface FolderChildrenConfiguration {
  name: string;
  content?: string;
  relativeDirectory: string;
  isDirectory?: boolean;
  execute?: boolean;
  type?: "page" | "widget" | "component";
  children?: FolderChildrenConfiguration[];
  moduleId?: string;
}

export interface FolderConfiguration {
  assetsDir: string;
  name: string;
  relativeDirectory: string;
  children: FolderChildrenConfiguration[];
}

export interface FolderDynamicData {
  global: {
    [key: string]: string;
  };
}

export interface FolderOptions {
  assetPath?: string;
  dynamicData?: FolderDynamicData;
}

export interface DynamicModuleHandlers {
  [key: string]: Function;
}

export interface DynamicModule {
  default: {
    directory: Object[];
  };
  handlers: DynamicModuleHandlers;
}

export interface DynamicModules {
  [key: string]: DynamicModule;
}

export interface PageDirectory extends FolderChildrenConfiguration {
  handler?: string;
  children: PageDirectory[];
}

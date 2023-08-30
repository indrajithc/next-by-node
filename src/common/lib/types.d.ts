export interface FolderChildrenConfiguration {
  name: string;
  content?: string;
  relativeDirectory: string;
  isDirectory?: boolean;
  execute?: boolean;
  type?: "page" | "widget" | "component";
  children?: FolderChildrenConfiguration[];
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

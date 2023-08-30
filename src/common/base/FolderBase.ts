/**
 * FolderBase class
 */
import { FolderDynamicData } from "@lib/types";

abstract class FolderBase {
  constructor(readonly dynamicData?: FolderDynamicData) {}

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
}

export default FolderBase;

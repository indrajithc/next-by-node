/**
 * Page class
 */

class Page {
  constructor(
    readonly name: string,
    readonly filePath: string
  ) {
    console.log({ name, filePath });
  }

  getContent() {
    return "";
  }
}

export default Page;

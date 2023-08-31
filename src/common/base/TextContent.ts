/**
 * TextContent class
 */

class TextContent {
  constructor(public text: string = "") {}

  addLine(line: string) {
    this.text = this.text + line + "\n";
  }

  append(content: string) {
    this.text = this.text + content;
  }

  prepped(content: string) {
    this.text = content + this.text;
  }

  get() {
    return this.text;
  }
}

export default TextContent;

/**
 * FunctionalComponent class
 */

import TextContent from "@base/TextContent";

class FunctionalComponent {
  content: TextContent;
  typeName: string;

  constructor(readonly name: string) {
    this.content = new TextContent("");
    this.typeName = `${name}Props`;

    this.addFileDoc();
    this.createMainFunction();
  }

  addFileDoc() {
    const content = new TextContent("");
    content.addLine(`/**`);
    content.addLine(`* Functional component`);
    content.addLine(`* ${this.name}`);
    content.addLine(`*/`);
    content.addLine(``);

    this.content.prepped(content.get());

    // if (this.content.match(/^\/\*\*/)) {
    //   this.content.replace(/^\/\*[\s\S\n]*?\*\/-/, content);
    // } else {
    //   this.content = content + "\n" + this.content;
    // }
  }

  createMainFunction() {
    const content = new TextContent(`import { FC } from "react";`);
    content.addLine(``);
    content.addLine(`interface ${this.typeName} {`);
    content.addLine(``);
    content.addLine(`}`);
    content.addLine(``);
    content.addLine(`const ${this.name}: FC<${this.typeName}> = () => {`);
    content.addLine(``);
    content.addLine(`  return (`);
    content.addLine(`    <div>${this.name}</div>`);
    content.addLine(`  );`);
    content.addLine(`};`);
    content.addLine(``);
    content.addLine(`export default HomeLayout;`);

    this.content.append(content.get());
  }

  getContent() {
    return this.content.get();
  }
}

export default FunctionalComponent;

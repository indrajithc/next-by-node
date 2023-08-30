/**
 * FunctionalComponent class
 */

class FunctionalComponent {
  content: string;
  typeName: string;

  constructor(readonly name: string) {
    this.content = ``;
    this.typeName = `${name}Props`;

    this.addFileDoc();
    this.createMainFunction();
  }

  addFileDoc() {
    let content = "";
    content = content + `/**`;
    content = content + "\n" + `* Functional component`;
    content = content + "\n" + `* ${this.name}`;
    content = content + "\n" + `*/`;

    if (this.content.match(/^\/\*\*/)) {
      this.content.replace(/^\/\*[\s\S\n]*?\*\/-/, content);
    } else {
      this.content = content + "\n" + this.content;
    }
  }

  createMainFunction() {
    let content = "";
    content = content + `import { FC } from "react";`;
    content = content + "\n" + ``;
    content = content + "\n" + `interface ${this.typeName} {`;
    content = content + "\n" + ``;
    content = content + "\n" + `}`;
    content = content + "\n" + ``;
    content = content + "\n" + `const ${this.name}: FC<${this.typeName}> = () => {`;
    content = content + "\n" + ``;
    content = content + "\n" + `  return (`;
    content = content + "\n" + `    <div>${this.name}</div>`;
    content = content + "\n" + `  );`;
    content = content + "\n" + `};`;
    content = content + "\n" + ``;
    content = content + "\n" + `export default HomeLayout;`;

    this.content = this.content + "\n" + content;
  }

  getContent() {
    return this.content;
  }
}

export default FunctionalComponent;

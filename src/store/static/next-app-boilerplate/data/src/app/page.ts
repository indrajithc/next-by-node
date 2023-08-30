/**
 * Root page content constructor utils
 */

import FunctionalComponent from "@utils/react/FunctionalComponent";

export default {
  directory: [
    {
      name: "page.tsx",
      relativeDirectory: "./",
      handler: "pageHandler",
    },
    {
      name: "layout.tsx",
      relativeDirectory: "./",
      handler: "layoutHandler",
    },
  ],
};

const pageHandler = () => {
  return "console.log('Hi page');";
};

const layoutHandler = () => {
  let content = "";

  const layoutFunctionalComponent = new FunctionalComponent("HomeLayout");

  content = content + layoutFunctionalComponent.getContent();
  console.log({ layoutFunctionalComponent });
  return content;
};

export const handlers = {
  pageHandler,
  layoutHandler,
};

/**
 * Root page content constructor utils
 */

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
  return "console.log('Hi layout');";
};

export const handlers = {
  pageHandler,
  layoutHandler,
};

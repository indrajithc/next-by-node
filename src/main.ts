// import File from "@base/File";
// import Directory from "@base/Directory";
import Folder from "@base/Folder";

const main = () => {
  console.info("Main called");

  // const sampleFile = new File("./test.txt");

  // const sampleDirectory = new Directory("./app");

  // console.log(sampleFile);
  // console.log({ sampleDirectory });

  const staticData = require("@store/static/next-app-boilerplate");

  const dynamicData = require("@store/dynamic/details/next-app-boilerplate.json");

  new Folder(staticData.default, { assetPath: "store/static", dynamicData });
};

export default main;

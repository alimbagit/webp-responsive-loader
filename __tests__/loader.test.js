import fs from "fs";
import compiler from "./compiler.js";
// import {DEFAULTS} from '../src/index';

// const imageFileName = "./images/test-jpg-image.jpg";

test("only param name", async () => {
  const inputFileName = "./images/test-jpg-image.jpg";
  const stats = await compiler(inputFileName, {
    name: "[path][name].[ext]",
  });
  console.log("STATS=",stats);
  const output = stats.toJson({ source: true }).modules[0].source;
  
  const trueOutput = `module.exports = {
    srcset: "./images/test-jpg-image320.webp 320w,./images/test-jpg-image720.webp 720w,./images/test-jpg-image1080.webp 1080w",
    sizes: "(max-width: 320px) 320px,(max-width: 720px) 720px,(max-width: 1080px) 1080px",
    srcOriginal: "./images/test-jpg-image.jpg",
    alt: "test-jpg-image",
    placeholder: "./images/test-jpg-image_placeholder.webp"
  }`;

  expect(output).toEqual(trueOutput);
});

import fs from "fs";
import compiler from "./compiler.js";
const _webpConverter = require("webp-converter");
var _path = require("path");

test("param only name jpg file", async () => {
  const inputFileName = "./images/jpg-image.jpg";
  const stats = await compiler(inputFileName, {
    name: "[path][name].[ext]"
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  
  const trueOutput = `module.exports = {
    srcset: "./images/jpg-image320.webp 320w,./images/jpg-image720.webp 720w,./images/jpg-image1080.webp 1080w",
    sizes: "(max-width: 320px) 320px,(max-width: 720px) 720px,(max-width: 1080px) 1080px",
    alt: "jpg-image",
  }`;

  expect(output).toEqual(trueOutput);
});


test("params: name, placeholder, emitOriginalFile, resizeList, from png file", async () => {
  const inputFileName = "./images/png-image.png";
  const stats = await compiler(inputFileName, {
    name: "[path][name].[ext]",
    placeholder: true,
    emitOriginalFile: true,
    resizeList: [200, 500, 1000]
  });
  const output = stats.toJson({ source: true }).modules[0].source;

  const beginPlaceholder = output.search("placeholder: ");
  let placeholderValue =output.slice(beginPlaceholder+14);
  placeholderValue=placeholderValue.slice(0,placeholderValue.search('"'));

  
  const trueOutput = `module.exports = {
    srcset: "./images/png-image200.webp 200w,./images/png-image500.webp 500w,./images/png-image1000.webp 1000w",
    sizes: "(max-width: 200px) 200px,(max-width: 500px) 500px,(max-width: 1000px) 1000px",
    alt: "png-image",
    srcOriginal: "images/png-image.png",
    placeholder: "${placeholderValue}",
  }`;

  expect(output).toEqual(trueOutput);
});

const _resizeList = ["240", "320", "480", "720", "1080"];

const Buffer = require("buffer").Buffer;

const _webpConverter = require("webp-converter");

var _options = require("./options.json");

var _loaderUtils = require("loader-utils");

var _schemaUtils = require("schema-utils");

var _path = require("path");

module.exports = function (content) {
  const options = _loaderUtils.getOptions(this);

  _schemaUtils(_options, options);

  const url = _loaderUtils.interpolateName(this, options.name, {
    context: this.rootContext,
    content,
    regExp: options.regExp,
  });
  let outputPath = url;
  console.log("url=", url);
  console.log("content=", typeof content);
  console.log("context=", this.context + options.name);
  console.log("outputPath=", outputPath);
  console.log("resourcePath=", this.resourcePath);

  //Формирование массива путей для будущих .webp файлов
  const extName = _path.extname(outputPath);
  const baseName = _path.basename(outputPath, extName);
  const dirName = _path.dirname(outputPath);

  let publicPathList = new Array();

  _resizeList.map((size) => {
    let newPublicPath = _path.join(dirName, baseName + size + ".webp");
    // newPublicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
    // _webpConverter.cwebp(outputPath, newPublicPath, "-resize 0 " + size);
    // const bufbase64= btoa(content);
    // const bufbase64 = Buffer.from(content);
    _webpConverter
      .buffer2webpbuffer(content, extName.slice(1), "-resize 0 " + size)
      .then((buf) => {
        console.log("newPublicPath=", newPublicPath);

        this.emitFile(newPublicPath, buf, null);
      });
    // publicPathList.push(newPublicPath);
  });

  // console.log("publicPathList=", publicPathList);

  //==============================================================

  // Проверяем включен ли параметр emitFile
  // if (typeof options.emitFile === "undefined" || options.emitFile) {
  //   // this.emitFile(_path.basename(outputPath), content, null);
  //   this.emitFile(outputPath, content, null);
  // }

  // let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
  // return `${"module.exports ="} ${publicPath};`;
  return "hello";
};

module.exports.raw = true;

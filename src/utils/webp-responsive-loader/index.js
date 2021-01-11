"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

const _resizeList = ["240", "320", "480", "720", "1080"]

const _webpConverter = require('webp-converter');

var _options = require("./options.json");

var _loaderUtils = require("loader-utils");

var _schemaUtils = require("schema-utils");

var _path = require("path");

exports.raw = void 0;

module.exports = function (content) {
  const options = _loaderUtils.getOptions(this);

  console.log("options=", options);

  _schemaUtils(_options, options);

  const context = options.context || this.rootContext;
  console.log("context=", context);

  const name = options.name || '[contenthash].[ext]';

  const url = _loaderUtils.interpolateName(this, name, {
    context,
    content,
    regExp: options.regExp
  });
  let outputPath = url;

  //Формирование массива путей для будущих webp файлов
  const baseName = _path.basename(outputPath, _path.extname(outputPath));
  const dirName = _path.dirname(outputPath);
  let publicPathList = new Array();
  _resizeList.map((size) => {
    let newPublicPath = _path.join(dirName, baseName + size + ".webp")
    newPublicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
    _webpConverter.cwebp(outputPath, newPublicPath, "-resize 0 " + size)
    publicPathList.push(newPublicPath);
  });
  console.log("publicPathList=", publicPathList);
  //==============================================================

  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  // Проверяем включен ли параметр emitFile
  if (typeof options.emitFile === 'undefined' || options.emitFile) {
    // const assetInfo = {};

    // if (typeof name === 'string') {
    //   let normalizedName = name;
    //   const idx = normalizedName.indexOf('?');

    //   if (idx >= 0) {
    //     normalizedName = normalizedName.substr(0, idx);
    //   }

    //   const isImmutable = /\[([^:\]]+:)?(hash|contenthash)(:[^\]]+)?]/gi.test(normalizedName);

    //   if (isImmutable === true) {
    //     assetInfo.immutable = true;
    //   }
    // }

    // Создаем ту же структуру файлов что и в источнике, если включен параметр emitFile
    // assetInfo.sourceFilename = _path.normalize(_path.relative(this.rootContext, this.resourcePath));
    // console.log("assetInfo=", assetInfo);
    this.emitFile(_path.basename(outputPath), content, null);
    // this.emitFile(outputPath, content, null);
  }

  console.log("publicPath=", publicPath);
  // webpConverter.cwebp()
  return `${'module.exports ='} ${publicPath};`;
};

const raw = true;
exports.raw = raw;
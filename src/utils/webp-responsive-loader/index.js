const _resizeDefaultList = [240, 320, 640, 720, 1080];

const _webpConverter = require("webp-converter");

var _options = require("./options.json");

var _loaderUtils = require("loader-utils");

var _schemaUtils = require("schema-utils");

var _path = require("path");

module.exports = function (content) {
  const options = _loaderUtils.getOptions(this);
  _schemaUtils(_options, options);

  /**Список размеров, в которые нужно перевести изображение */
  const resizeList = options.resizeList ? options.resizeList : _resizeDefaultList;

  /**Имя файла-источика с отоносительной директорией */
  const outputPath = _loaderUtils.interpolateName(this, options.name, {
    context: this.rootContext
  });

  /**Имя файла, который будет в сборке */
  const publicPath = options.publicPath
    ? _path.normalize(options.publicPath + '/' + _path.basename(outputPath))
    : outputPath;
  console.log("options=", options);
  console.log("outputPath=", outputPath);
  console.log("publicPath=", publicPath);

  /**Расширение файла*/
  const extNameOutput = _path.extname(publicPath);

  /**Имя файла без расширения */
  const baseNameOutput = _path.basename(publicPath, extNameOutput);

  /**Директория, в которой находится файл*/
  const dirNameOutput = _path.dirname(publicPath);


  //создание placeholder файла
  if (options.placeholder) {
    let publicPathPlaceholder = _path.join(dirNameOutput, baseNameOutput + "_placeholder.webp");
    _webpConverter
      .buffer2webpbuffer(content, extNameOutput.slice(1), "-q 10 -resize 100 0")
      .then((buf) => {
        this.emitFile(publicPathPlaceholder, buf, null);
      });
  }

  /**Массив путей для srcset */
  let srcSetList = new Array();
  /**Массив зусловий для атрибута sizes */
  let sizesList = new Array();

  //Формирование массива путей для будущих .webp файлов и добавление самих файлов
  resizeList.map((size) => {
    let newPublicPath = _path.join(dirNameOutput, baseNameOutput + size + ".webp");
    _webpConverter
      .buffer2webpbuffer(content, extNameOutput.slice(1), "-resize " + size + " 0")
      .then((buf) => {
        this.emitFile(newPublicPath, buf, null);
      });
    srcSetList.push(`./${newPublicPath.replace(/\\/gi, "\/")} ${size}w`);
    sizesList.push(`(max-width: ${size}px) ${size}px`);
  });

  //Добавление исходного файла в сборку
  if (options.emitOriginalFile) {
    this.emitFile(publicPath, content, null);
  }

  return `${options.esModule ? "export default" : "module.exports ="} {
    srcset: "${srcSetList.toString()}",
    sizes: "${sizesList.toString()}",
    srcOriginal: "${publicPath}",
    alt: "${baseNameOutput}"
  }`;
};

module.exports.raw = true;
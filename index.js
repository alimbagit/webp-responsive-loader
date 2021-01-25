const DEFAULTS = {
  resizeList: [320, 720, 1080],
};

const _webpConverter = require("webp-converter");

var _options = require("./options.json");

var _loaderUtils = require("loader-utils");

var _schemaUtils = require("schema-utils");

var _path = require("path");

module.exports = async function (content) {
  const options = _loaderUtils.getOptions(this);
  _schemaUtils(_options, options);

  /**Список размеров, в которые нужно перевести изображение */
  const resizeList = options.resizeList
    ? options.resizeList
    : DEFAULTS.resizeList;

  /**Имя файла-источика с отоносительной директорией */
  const outputPath = _loaderUtils.interpolateName(this, options.name, {
    context: this.rootContext,
  });

  /**Полное имя файла, который будет в сборке */
  const publicPath = options.publicPath
    ? _path.normalize(options.publicPath + "/" + _path.basename(outputPath))
    : outputPath;

  /**Расширение файла*/
  const extNameOutput = _path.extname(publicPath);

  /**Имя файла без расширения */
  const baseNameOutput = _path.basename(publicPath, extNameOutput);

  /**Директория, в которой находится файл*/
  const dirNameOutput = _path.dirname(publicPath);

  /**Placeholder, который будет возвращен */
  let placeholder;

  //создание placeholder
  if (options.placeholder) {
    placeholder = await (
      await _webpConverter.buffer2webpbuffer(
        content,
        extNameOutput.slice(1),
        "-q 10 -resize 100 0"
      )
    ).toString("base64");
  }

  /**Массив путей для srcset */
  let srcSetList = new Array();
  /**Массив условий для атрибута sizes */
  let sizesList = new Array();

  //Формирование массива путей для будущих .webp файлов и добавление самих файлов
  resizeList.map((size) => {
    let newPublicPath = _path.join(
      dirNameOutput,
      baseNameOutput + size + ".webp"
    );
    _webpConverter
      .buffer2webpbuffer(
        content,
        extNameOutput.slice(1),
        "-resize " + size + " 0"
      )
      .then((buf) => {
        this.emitFile(newPublicPath, buf, null);
      });
    srcSetList.push(`./${newPublicPath.replace(/\\/gi, "/")} ${size}w`);
    sizesList.push(`(max-width: ${size}px) ${size}px`);
  });

  //Добавление исходного файла в сборку
  if (options.emitOriginalFile) {
    this.emitFile(publicPath, content, null);
  }

  /**возвращаемый результат лоадера */
  let returnObject = `module.exports = {
    srcset: "${srcSetList.toString()}",
    sizes: "${sizesList.toString()}",
    alt: "${baseNameOutput}",`;

  if (options.emitOriginalFile) {
    returnObject += `
    srcOriginal: "${publicPath}",`;
  };
  if (options.placeholder) {
    returnObject += `
    placeholder: "${placeholder}",`;
  }
  returnObject += `
  }`;
  return returnObject;
};

module.exports.raw = true;

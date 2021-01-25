# responsive-loader

[![npm][npm]][npm-url]
[![node][node]][node-url]

Загрузчик веб-пакетов для адаптивных изображений. Создает несколько изображений формата .webp из одного исходного изображения и возвращает srcset и sizes. Чтобы иметь представление что такое адаптивные изображение можете пройти сюда [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).


## Установка

### npm

```
npm install webp-responsive-loader --save-dev
```

### yarn

```
yarn webp-responsive-loader -D
```

## Использование

Добавьте правило для загрузки адаптивных изображений в конфигурацию вашего веб-пакета:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|bmp)$/i,
        use: {
          loader: "responsive-loader",
          options: {
            name: "[path][name].[ext]", // параметр name является обязательным для работы лоадера
          },
        },
      },
    ],
  },
};
```

Затем импортируйте изображения в свои файлы JavaScript:

```js
import responsiveImage from 'img/myImage.jpg';

...
    <img
      srcSet={responsiveImage.srcset}
      sizes={responsiveImage.sizes}
    />
...
```

Примечания:

- `sizes`, без размеров браузер предполагает, что изображение всегда 100vw для любого окна просмотра.
- `srcset`, Современные браузеры будут выбирать наиболее близкое к изображению лучшее изображение в зависимости от плотности пикселей вашего экрана.


### Параметры

| Параметр                      | Тип                 | Default                | Описание                                                                                                                                                                                                                                                                           |
| --------------------------- | -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                      | `string`             | `undefined`            | Это обязательный параметр. Шаблон имени файла для выходных файлов.                                                                                                                                                                                                                                       |
| `publicPath`                | `string`             | `undefined`            | Папка, в которую будут помещены при сборке проекта file.                                                                                                                                                                                                                                         |
| `emitOriginalFile`          | `boolean`             | `undefined`           | Если true, то добавляет оригинальный файл в сборку и возвращает путь к нему в переменной srcOriginal                                                                                                                   |
| `resizeList`                | `array integer`  | `[320, 720, 1080]`    | Ширина новых webp файлов. Данный список используется когда нужно передать свои размеры конечных фалов webp                                 |
| `placeholder`               | `string`            | `undefined`        | placeholder. Будет показан пока основное изображение загружается                                                                                                                                 |

### Пример использования

Добавьте пдобные инструкции в настройки webpack.
**webpack.config.js**
```js
module.exports = {
  entry: {...},
  output: {...},
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|bmp)$/i,
         use: [
          {
            loader: "webp-responsive-loader",
            options: {
              name: "[path][name].[ext]",
              resizeList: [320, 960, 1800],
              placeholder: true,
              publicPath: "images"
            },
          },
        ],
      }
    ]
  },
}
```

**component.js**
```js
import responsiveImage from 'img/myImage.jpg';
...
    <img
      srcSet={responsiveImage.srcset}
      sizes={responsiveImage.sizes}
      placeholder={responsiveImage.placeholder}
    />
...
```


## Typescript

Если в вашем проекте используется typescript, то вы можете использовать файл деклараций.
**tsconfig.json**
```js
{
...
    "compilerOptions": {
      ...
      "typeRoots": ["src/typings"],
      ...
    }
}
```
**src/typings/types.d.ts**
```js
...
/// <reference types="webp-responsive-loader" />
...
```



[npm]: https://img.shields.io/npm/v/webp-responsive-loader.svg
[npm-url]: https://npmjs.com/package/webp-responsive-loader
[node]: https://img.shields.io/node/v/webp-responsive-loader.svg
[node-url]: https://nodejs.org
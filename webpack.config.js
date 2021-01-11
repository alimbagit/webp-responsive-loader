const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(js|jsx)$/, use: {
          loader: 'babel-loader', options: {
            presets: ['@babel/preset-react']
          }
        }, exclude: "/node_modules/",
      },
      {
        test: /\.html/,
        use: ["html-loader"],
        exclude: "/node_modules/"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "./src/utils/webp-responsive-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
          // {
          //   loader: "file-loader",
          //   options: {
          //     name: "[path][name].[ext]",
          //     // esModule: false,
          //     // emitFile: true,
          //   },
          // },
        ],
      },
    ]
  },
  devtool: "source-map",

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
    })
  ],
  devServer: {
    host: "0.0.0.0",
    port: 7000,
    historyApiFallback: true,
  },

  resolve: {
    extensions: [
      ".webpack.js",
      ".web.js",
      ".js",
      ".jsx",
      ".jpg",
    ]
  },
}
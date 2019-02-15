const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const path = require("path");
const webpack = require("webpack"); // 用于访问内置插件

const config = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        include: /src/, // 只转化src目录下的js
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      }
    ]
  },
  resolve: {
    // 别名
    alias: {
      editer: path.join(__dirname, "src/editer"),
      components: path.join(__dirname, "src/components")
    },
    // 省略后缀
    extensions: [".js", ".jsx", ".json", ".css"]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })]
};

module.exports = config;

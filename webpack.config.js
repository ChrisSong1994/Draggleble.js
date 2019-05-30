const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const CleanWebpackPlugin = require('clean-webpack-plugin');// 清理模块
const argv = require('yargs-parser')(process.argv.slice(2));  //  yargs-parser 模块用来获取命令行参数
const pro = argv.mode == 'production' ? true : false;  //  区别是生产环境和开发环境

let plu = [];
if (pro) {
  //  线上环境
  plu.push(
    new CleanWebpackPlugin('example')
  )
} else {
  //  开发环境
  plu.push(
    new webpack.HotModuleReplacementPlugin()  // 热更新，热更新不是刷新
  )
}




module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/main.js"),
  output: {
    filename: "draggleble.js",
    path: path.resolve(__dirname, "example")
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
        include: /src/,
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      src: path.join(__dirname, "src"),
      editer: path.join(__dirname, "src/editer"),
      components: path.join(__dirname, "src/components")
    },
    extensions: [".js", ".jsx", ".json", ".css"]
  },
  plugins: plu.push(new HtmlWebpackPlugin({ template: path.join(__dirname, "src/index.html") })),
  devServer: {
    contentBase: path.join(__dirname, "example"),
    compress: true,
    port: 9000
  }
};


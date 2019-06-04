const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const argv = require('yargs-parser')(process.argv.slice(2));  //  yargs-parser 模块用来获取命令行参数
const pro = argv.mode == 'production' ? true : false;  //  区别是生产环境和开发环境

let plu = [new HtmlWebpackPlugin({ template: path.join(__dirname, "src/index.html") })];
if (!pro) {
  //  开发环境
  plu.push(
    new webpack.HotModuleReplacementPlugin()  // 热更新，热更新不是刷新
  )
}

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "draggleble_[hash].js",
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      src: path.join(__dirname, "src"),
      components: path.join(__dirname, "src/components")
    },
    extensions: [".js", ".jsx", ".json", ".css"]
  },
  plugins: plu,
  devServer: {
    contentBase: path.join(__dirname, "example"),
    compress: true,
    port: 9000
  },
  devtool: 'inline-source-map'
};


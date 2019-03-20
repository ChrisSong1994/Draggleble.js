const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const path = require("path");
const webpack = require("webpack");

const config = {
  mode: "development",
  entry: path.resolve(__dirname, "src/main.js"),
  output: {
    filename: "draggleble.js",
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
        include: /src/, 
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      }
    ]
  },
  resolve: {
    // 别名
    alias: {
      src: path.join(__dirname, "src"),
      editer: path.join(__dirname, "src/editer"),
      components: path.join(__dirname, "src/components")
    },
    // 省略后缀
    extensions: [".js", ".jsx", ".json", ".css"]
  },
  plugins: [new HtmlWebpackPlugin({ template:path.join(__dirname, "src/index.html" )})],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};

module.exports = config;

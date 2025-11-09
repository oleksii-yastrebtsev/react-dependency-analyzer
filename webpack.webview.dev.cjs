/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/** @type {import("webpack").Configuration} */
module.exports = {
  target: "web",
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build", "webview"),
    publicPath: "",
    filename: "webview.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.webview.json"),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    allowedHosts: "all",
    static: "./build/webview",
    host: "localhost",
    hot: true,
    port: 3000,
    compress: true,
    client: {
      overlay: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  devtool: "source-map",
};

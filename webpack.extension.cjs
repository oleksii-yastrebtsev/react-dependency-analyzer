/** @typedef {import('webpack').Configuration} WebpackConfig **/

const webpack = require("webpack");
const path = require("path");

/** @type WebpackConfig */
module.exports = {
  target: "node",
  mode: "production",
  entry: "./extention-src/extention.ts",
  output: {
    path: path.resolve(__dirname, "build", "extention"),
    filename: "extention.cjs",
    libraryTarget: "commonjs2",
    clean: true,
  },
  externals: {
    vscode: "commonjs vscode",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.extention.json"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.BannerPlugin({
      banner: "/*! VS Code Extension Build */",
      raw: true,
    }),
  ],
  devtool: "nosources-source-map",
  performance: {
    hints: false,
  },
  infrastructureLogging: {
    level: "log",
  },
};

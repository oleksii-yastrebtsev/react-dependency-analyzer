/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require("path");

/** @type WebpackConfig */
module.exports = {
  target: "web",
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build", "webview"),
    filename: "webview.js",
    clean: true,
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
  devtool: "source-map",
  performance: {
    hints: false,
  },
  infrastructureLogging: {
    level: "warn",
  },
};

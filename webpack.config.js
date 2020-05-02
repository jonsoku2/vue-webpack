const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const merge = require("webpack-merge");

module.exports = (env, opts) => {
  const config = {
    entry: {
      app: path.join(__dirname, "src", "index.js"),
    },
    output: {
      filename: `[name].js`,
      path: path.join(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
        {
          test: /\.js$/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            "vue-style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
      new CopyPlugin([{ from: "src/assets/", to: "assets/" }]),
    ],
  };
  if (opts.mode === "development") {
    return merge(config, {
      devtool: "#eval",
      devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        compress: true,
        open: true,
      },
    });
  } else if (opts.mode === "production") {
    return merge(config, {
      devtool: "#cheap-eval-source-map",
      plugins: [new CleanWebpackPlugin()],
    });
  }
};

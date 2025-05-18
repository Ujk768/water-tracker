// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      popup: path.resolve("src/popup/index.tsx"),
      options: path.resolve("src/options/index.tsx"),
      background: path.resolve("src/background/background.ts"),
      contentScript: path.resolve("src/contentScript/contentScript.ts"),
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist"),
    },
    module: {
      rules: [
        // TypeScript and TSX
        {
          test: /\.(ts|tsx)$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        // Sass files
        {
          test: /\.(scss|sass)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        // CSS files
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        // Image files
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[hash][ext][query]",
          },
        },
        // Font files
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[hash][ext][query]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve("./src/static"), to: path.resolve("dist") },
        ],
      }),
      new ForkTsCheckerWebpackPlugin(),
      ...(getHtmlPlugins(["popup", "options", "newTab"])),
      ...(isProduction ? [new MiniCssExtractPlugin()] : []),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    devtool: isProduction ? false : "cheap-module-source-map",
  };
};

function getHtmlPlugins(chunks) {
  const titles = {
    popup: "Water Tracker",
    options: "Settings",
    newTab: "New Tab", // or leave blank
  };

  return chunks.map((chunk) =>
    new HtmlWebpackPlugin({
        title: "Water Tracker Extension",
      filename: `${chunk}.html`,
      chunks: [chunk],
    })
  );
}
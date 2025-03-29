// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
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
      newTab: path.resolve("src/tabs/Tabs.tsx"),
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist"),
    },

    module: {
      rules: [
        // TypeScript/JavaScript files with Babel
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: ["@babel/plugin-transform-react-jsx"],
            },
          },
        },
        // Sass files
        {
          test: /\.(scss|sass)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        },
        // CSS files (for any regular CSS)
        {
          test: /\.css$/,
          use: ["css-loader", "postcss-loader"],
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
      extensions: [".tsx", ".ts", ".js", ".jsx"],
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
      ...getHtmlPlugins(["popup", "options", "newTab"]),
    ],

    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },

    devtool: "cheap-module-source-map",
  };
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        title: "Water Tracker Extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}

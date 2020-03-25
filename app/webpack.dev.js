const path = require("path");
const glob = require("glob");

const PATHS = {
  src: path.join(__dirname, "src")
};
const PurgecssPlugin = require("purgecss-webpack-plugin");

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/js/index.js"
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader"
        }
      },

      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },

      {
        test: /\.scss$/,
        use: [miniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },

      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" }
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: []
          }
        }
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
              esModule: false
            }
          }
        ]
      },

      {
        test: /\.(svg|png|jpe?g|webp|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),
    new webpack.HotModuleReplacementPlugin(),

    // Create as many pages you need
    new htmlWebpackPlugin({
      title: "index",
      filename: "index.html",
      template: "./src/pages/index.html",
      chunks: ["index"]
    })
  ]
};

//new PurgecssPlugin({
//  paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
//})

const path = require("path")
const webpack = require("webpack")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

module.exports = {
    name: "client",
    mode: "development",
    entry: {
      vendor: ["react", "react-dom"],
      main: [
        "react-hot-loader/patch",
        "@babel/runtime/regenerator",
        "webpack-hot-middleware/client?reload=true",
        "./Main.js"
      ]
    },
    output: {
      filename: "[name]-bundle.js",
      chunkFilename: "[name].js",
      path: path.resolve(__dirname, "../public"),
      publicPath: "/"
    },
    devServer: {
      contentBase: path.resolve(__dirname, "../public"),
      overlay: true,
      stats: {
        colors: true
      }
    },
    optimization: {
      minimize: false,
      runtimeChunk: {
        name: "bootstrap"
      },
      splitChunks: {
        chunks: "initial",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor"
          }
        }
      }
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            ExtractCssChunks.loader, 
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  mode: 'local',
                  localIdentName: '[path][name]__[local]'
                },
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractCssChunks({ hot: true }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("development"),
          WEBPACK: true
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
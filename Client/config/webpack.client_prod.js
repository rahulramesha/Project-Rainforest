const path = require("path")
const webpack = require("webpack")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")

module.exports = {
    name: "client",
    mode: "production",
    entry: {
      vendor: ["react", "react-dom"],
      main: [
        "@babel/runtime/regenerator",
        "./Main.js"
      ]
    },
    output: {
      filename: "[name]-bundle.js",
      chunkFilename: "[name].js",
      path: path.resolve(__dirname, "../public"),
      publicPath: "/"
    },
    optimization: {
      runtimeChunk: {
        name: "bootstrap"
      },
      splitChunks: {
        chunks: "initial",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors"
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|Backend)/,
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
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env"
                    ],
                  ],
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
      new ExtractCssChunks(),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
          WEBPACK: true
        }
      }),
      new UglifyJSPlugin(),
      new CompressionPlugin({
        algorithm: "gzip"
      }),
      new BrotliPlugin()
    ]
  }
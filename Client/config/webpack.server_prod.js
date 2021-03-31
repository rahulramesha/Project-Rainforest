const path = require("path")
const webpack = require("webpack")
const externals = require("./node-externals")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

module.exports = {
  name: "server",
  mode: "production",
  target: "node",
  externals,
  entry: [
    "@babel/runtime/regenerator",
    "./SSR/Render.js"
  ],
  output: {
    filename: "prod-server-bundle.js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
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
              loader: "css-loader",
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
            "sass-loader",
            
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]",
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        STATIC_URL: JSON.stringify(process.env.STATIC_URL),
        HOST_NAME: JSON.stringify(process.env.HOST_NAME)
      }
    })
  ]
}

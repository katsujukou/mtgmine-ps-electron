const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const path = require('path')

const useSourceMap = process.env.NODE_ENV !== "production"

const webpackConfig = {
  cache: true,
  mode: process.env.NODE_ENV ?? 'development',
  devtool: useSourceMap ? 'eval' : undefined,  
}

const webpackConfigRenderer = {
  target: 'electron-renderer',
  entry: './build/renderer.js',
  output: {
    path: path.join(__dirname, 'build', '.dist'),
    filename: 'js/renderer.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: useSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: useSourceMap,
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'build', 'index.html')
    })
  ]
}

const webpackConfigMain = {
  target: 'electron-main',
  entry: './build/main.js',
  output: {
    path: path.join(__dirname, 'build', '.dist'),
    filename: 'js/main.js',
    clean: true
  }
}

module.exports = [
   merge(webpackConfig, webpackConfigMain),
   merge(webpackConfig, webpackConfigRenderer)
]
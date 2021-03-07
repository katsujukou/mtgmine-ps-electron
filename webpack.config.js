const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const webpackConfigRenderer = (env = 'production', argv = {}) => {
  const mode = env === 'production' ? 'production' : env === 'development' ? 'development' : 'none'
  const entry = { render: `./build/renderer-${env === 'production' ? 'prod' : 'dev'}.js` }
  const target = env === 'production' ? { target: 'electron-renderer' } : {}

  const output =
    {
      path: path.join(__dirname, 'build', '.dist'),
      filename: env === 'production' ? 'js/[name].js' : 'js/[name].[contenthash].js',
    }

  const devtool = env === 'production' ? false : 'eval'
  const devServer = env !== 'production' ? {
    port: process.env.WDS_PORT ?? 8080,
    hot: true,
    liveReload: false,
    writeToDisk: (filePath) => {
      return filePath === "main.js"
    }
  } : {}

  return {
    name: 'renderer',
    ...target,
    mode,
    entry,
    output,
    cache: env !== 'production',
    devtool,
    devServer,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: ['/node_modules/'],
          loader: 'babel-loader',
        },
        {
          test: /\.sass$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: env !== 'production',
                importLoaders: 2
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: env !== 'production',
              }
            }
          ]
        }
      ],
    },
    resolve: {
      alias: {
        "../Halogen.Component/index.js": path.resolve(__dirname, "build/Halogen.Component.patch.js")
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'initial',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'build', 'index.html')
      })
    ]
  }
}

const webpackConfigMain = (env = 'production', argv = {}) => {
  const mode = env === 'production' ? 'production' : env === 'development' ? 'development' : 'none'

  return {
    name: 'main',
    mode,
    target: 'electron-main',
    entry: './build/main.js',
    output: {
      path: path.join(__dirname, 'build', '.dist'),
      filename: `js/main${env === 'production' ? '.[contentBase]' : ''}.js`,
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: ['/node_modules/'],
          loader: 'babel-loader',
        }
      ],
    }
  }
}

module.exports = [
   webpackConfigMain,
   webpackConfigRenderer
]
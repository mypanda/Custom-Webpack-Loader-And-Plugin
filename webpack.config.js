const { resolve } = require('path')
const bundlesizeplugin = require('./bundlesize-webpack-plugin')
const path = require('path')

module.exports = {
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      // {
      //   test: /\.mp3$/,
      //   use: ['babel-loader', 'mp3-loader'],
      // },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'mp3-loader',
            options: {
              maxSizeBytes: 10,
            },
          }
        ],
      }
    ]
  },
  resolveLoader: {
    alias: {
      'mp3-loader': path.resolve(__dirname, 'mp3-loader/index.js')
    }
  },
  plugins: [new bundlesizeplugin({
    sizeLimit: 4
  })]
}
const { resolve } = require('path')
const BundlesizeWebpackPlugin = require('./bundlesize-webpack-plugin')
const FilelistWebpackPlugin = require('./filelist-webpack-plugin')
const TestWebpackPlugin = require('./test-webpack-plugin')
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
        use: [ 'jsinfo-loader', 'babel-loader']
      },
      // {
      //   test: /\.mp3$/,
      //   use: ['babel-loader', 'mp3-loader'],
      // },
      {
        test: /\.mp3$/,
        use: [{
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
      'jsinfo-loader': path.resolve(__dirname, 'jsinfo-loader/index.js'),
      'mp3-loader': path.resolve(__dirname, 'mp3-loader/index.js')
    }
  },
  plugins: [
    new FilelistWebpackPlugin({
      outputFile: 'fileList.md'
    }),
    new BundlesizeWebpackPlugin({
      sizeLimit: 4
    }),
    new TestWebpackPlugin()
  ]
}
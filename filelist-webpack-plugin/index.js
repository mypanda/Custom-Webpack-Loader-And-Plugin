module.exports = class BundlesizeWebpackPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    const pluginName = BundlesizeWebpackPlugin.name
    const outputFile = this.options?.outputFile ?? 'assets.md'


    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {

      const content = '# In this build:\n\n' + Object.keys(compilation.assets).map((filename) => `- ${filename}`).join('\n')

      compilation.assets[outputFile] = {
        source: function () {
          return content
        },
        size: function () {
          return content.length
        }
      }

      callback()
    })
  }
}
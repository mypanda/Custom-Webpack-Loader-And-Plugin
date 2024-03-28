module.exports = class TestWebpackPlugin {
  constructor() {

  }
  apply(compiler) {
    compiler.plugin("compilation", compilation => {
      compilation.hooks.buildModule.tap('xxx', module => {
        console.log(module)
      })
    })
  }
}
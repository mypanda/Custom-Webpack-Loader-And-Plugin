const path = require('path')
module.exports = function (source, sourceMap, data) {
  // 直接返回
  // return `/* \n * @author Mypanda */\n${source}`

  // 通过获取Webpack实例做处理
  // this.callback(null, `/* \n * @author Mypanda */\n${source}`, sourceMap, data)
  
  // 取消loader缓存
  // this.cacheable(false)

  // 异步返回
  // const callback = this.async()
  // setTimeout(() => { callback(null, `/* \n * @author Mypanda */\n${source}`, sourceMap, data) }, 1000)

  // 写文件
  const filename = path.basename(this.resourcePath)
  const assetInfo = { sourceFilename: filename }
  const info = '哈哈'
  this.emitFile(assetInfo.sourceFilename + '.txt', info, null, assetInfo)

  // 添加额外依赖
  // this.addDepependency(path)

  // 添加日志
  // const logger = this.getLogger('xxx-loader')
  // logger.info('info级别的日志')

  // 错误上报
  // this.emitError(new Error('出错啦！！！'))

  // 错误处理
  // this.callback(new Error('错误'), source, sourceMap, data)

  // 返回处理完毕的资源
  return source
}

// 接受原始Buffer
module.exports.raw = true
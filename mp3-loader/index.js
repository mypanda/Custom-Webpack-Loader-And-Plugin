const path = require('path')
const fs = require('fs')
// 添加参数验证
const { validate } = require('schema-utils')
const schema = {
  properties: {
    maxSizeBytes: {
      type: 'number',
    },
  },
}
const { getOptions } = require('loader-utils')

module.exports = function (source) {
  // 获取添加的参数
  // const options = this.getOptions() v5
  const options = getOptions(this) // v4
  const logger = this.getLogger()
  const assetStats = fs.statSync(this.resourcePath)
  validate(schema, options)
  console.log(assetStats.size, options.maxSizeBytes, '-----------')
  if (assetStats.size > options.maxSizeBytes) {
    logger.warn('Imported MP3 file is too large!')
  }

  const filename = path.basename(this.resourcePath)
  const assetInfo = { sourceFilename: filename }
  this.emitFile(filename, source, null, assetInfo)
  return `
import React from 'react'
export default function Player(props){
  return <audio controls src='${filename}' />
}`
}

module.exports.raw = true
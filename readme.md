# custom webpack plugin && custom webpack loader

## custom-webpack-loader

* style-loader是把翻译的css模块插入页面中
* css-loader是翻译css为模块
* less-loader是翻译less文件
* mp3-loader自定义，作用：①提醒文件过大，②当用户从mp3文件引用时，返回一个组件，而不是一个二进制文件
* jsinfo-loader写入其他文件

## custom-webpack-plugin

* Webpakck通过调用插件完成构建，loader作为遇到不识别文件的翻译器
* ProgressPlugin内置插件，用于构建进度显示
* bundlesizeWebpackPlugin自定义插件，用于提醒chunk文件大于用户设置值
* FilelistWebpackPlugin自定义插件，显示有多少chunk文件输出

## Webpack流程阶段
1. 将命令行参数和默认参数合并，并执行webpack方法
2. 创建compiler对象，初始化基础插件，执行compiler.run。每次执行run编译都会创建compilation对象，compilation对象负责一次编译过程
3. 执行compiler的make方法，调用compilation的buildModule方法创建模块对象
4. 生成入口AST（抽象语法树），通过AST分析和递归加载依赖模块
5. 分析模块完成，执行compilation的seal方法，对每个chunk整理优化封装
6. 最后执行compiler的emitAssests方法，把生成的文件输出发哦ouput的目录

## Webpack有几个重要对象,Compiler,Compilation,JavascriptParser都继承了Tapable。拥有丰富的钩子

例如:
compiler.hooks.emit.tap 编译创建chunk完成

#### Compiler常用钩子

* Compiler 编译器模块，是创建 编译实例 的主引擎
* 大多数面向用户的插件，都在 Compiler 上注册

|钩子	|类型	|什么时候调用|
|--|--|--|
|run	|AsyncSeriesHook	|在编译器 开始读取记录前 执行|
|compile	|SyncHook	|在一个新的 compilation 创建之前执行|
|compilation	|SyncHook	|在一次 compilation 创建后执行插件|
|make	|AsyncParallelHook	|完成一次编译前执行|
|emit	|AsyncSeriesHook	|在生成文件到 output 目录之前执行，回调参数：compilation|
|afterEmit	|AsyncSeriesHook	|在生成文件到 output 目录之后执行|
|assetEmitted	|AsyncSeriesHook	|生成文件的时候执行，提供访问产出文件信息的入口，回调参数：file，info|
|done	|AsyncSeriesHook	|一次编译完成后执行，回调参数：stats|

#### Compilation

* Compilation 是 Compiler 用来创建一次新的编译过程的模块
* 一个 Compilation 实例可以访问所有模块和它们的依赖
* 在一次编译阶段，模块被加载、封装、优化、分块、散列和还原

|钩子	|类型	|什么时候调用|
|--|--|--|
|buildModule	|SyncHook	|在模块开始编译之前触发，可以用于修改模块|
|succeedModule	|SyncHook	|当一个模块被成功编译，会执行这个钩子|
|finishModules	|AsyncSeriesHook	|当所有模块都编译成功后被调用|
|seal	|SyncHook	|当一次 compilation 停止接收新模块时触发|
|optimizeDependencies	|SyncBailHook	|在依赖优化的开始执行|
|optimize	|SyncHook	|在优化阶段的开始执行|
|optimizeModules	|SyncBailHook	|在模块优化阶段开始时执行，插件可以在这个钩子里执行对模块的优化，回调参数：modules|
|optimizeChunks	|SyncBailHook	|在代码块优化阶段开始时执行，插件可以在这个钩子里执行对代码块的优化，回调参数：chunks|
|optimizeChunkAssets	|AsyncSeriesHook	|优化任何代码块资源，这些资源存放在 compilation.assets 上。一个 chunk 有一个 files 属性，它指向由一个 chunk 创建的所有文件。任何额外的 chunk 资源都存放在compilation.additionalChunkAssets上。回调参数：chunks|
|optimizeAssets	|AsyncSeriesHook	|优化所有存放在 compilation.assets 的所有资源。回调参数：assets|

获取Compilation
```js
apply() {
  compiler.plugin("compilation", compilation => {
    compilation.hooks.buildModule.tap('xxx', module => {
      console.log(module.resource)
    })
  })
}
```

#### JavascriptParser Hooks（继承了 Tapable ）
* Parser 解析器实例在 Compiler 编译器中产生，用于解析 Webpack 正在处理的每个模块
* 可以用它提供的 Tapable 钩子，自定义解析过程

|钩子	|类型	|什么时候调用|
|--|--|--|
|evaluate	|SyncBailHook	|在计算表达式的时候调用|
|statement	|SyncBailHook	|为代码片段中每个 已解析的语句 调用的通用钩子|
|import	|SyncBailHook	|为代码片段中每个 import 语句调用，回调参数：statement,source|
|export	|SyncBailHook	|为代码片段中每个 export 语句调用，回调参数：statement|
|call	|SyncBailHook	|解析一个 call 方法的时候调用，回调参数：expression|
|program	|SyncBailHook	|解析一个 表达式 的时候调用，回调参数：expression|

## 插件中compiler.hooks.xxx，代表webpack执行的阶段

* compiler.hooks.emit.tap 同步插件
* compiler.hooks.emit.tapAsync 异步插件手动调用callback
* compiler.hooks.emit.tapPromise 异步插件返回一个Promise，手动触发resolve函数

compiler常用Hooks

* run,make,emit

### 参考
https://www.digitalocean.com/community/tutorials/js-create-custom-webpack-plugin
https://kettanaito.com/blog/writing-custom-webpack-loader
https://juejin.cn/post/6918998088010956807
https://blog.csdn.net/Lyrelion/article/details/128501629
https://champyin.com/2020/01/12/%E6%8F%AD%E7%A7%98webpack-plugin/
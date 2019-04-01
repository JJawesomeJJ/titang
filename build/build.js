"use strict";//严格模式
//node for loading
const ora = require("ora");//主要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等
// rm-rf for node
const rm = require("rimraf");//delete path
//console for node
const chalk = require("chalk");//design style of console
//path for node
const path = require("path");
//webpack
const webpack = require("webpack");
//webpack production setting
const config = require("./webpack.prod.conf");
//指定删除的文件
const rmFile = path.resolve(__dirname, "../public/static"); //转化为绝对路径；
//build start loading
const spinner = ora("building for production...");
spinner.start();

//构建全量压缩包！
rm(rmFile, function(err) {
  if (err) throw err;
  webpack(config, function(err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );

    if (stats.hasErrors()) {
      console.log(chalk.red("  Build failed with errors.\n"));
      process.exit(1);
    }

    console.log(chalk.cyan("  Build complete.\n"));
    console.log(
      chalk.yellow(
        "  Tip: built files are meant to be served over an HTTP server.\n" +
          "  Opening index.html over file:// won't work.\n"
      )
    );
  });
});

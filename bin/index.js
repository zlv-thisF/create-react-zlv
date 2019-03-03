#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const path = require("path");
const ora = require('ora');
const download = require("download-git-repo");
const fs = require("fs-extra");
const symbols = require('log-symbols');
const pkg = require("../package");
const config = require("../config");

commander
    .version(pkg.version)
    .option("-i --init [name]");

commander.on("--help", function(){
   console.log("");
   console.log("  create app with react hooks");
   console.log("");
   console.log("Example:");
   console.log(`  create-react-zlv -i ${chalk.green("<your_project_name_here>")}`);
   console.log("");
});

commander.parse(process.argv);

if (commander.init) {
    const spinner = ora('正在初始化项目...');
    const { gitUrl, branch } = config;
    let projectPath = path.resolve(commander.init);
    const projectName = path.win32.basename(projectPath);
    if (!fs.existsSync(projectName)) {
        console.log(`${chalk.red("Init project in:  ")}${chalk.green(projectName)}`);
        spinner.start();
        download(`direct:${gitUrl}#${branch}`, projectName, { clone: true }, err => {
            if (err) {
                spinner.fail();
                console.log(symbols.error, chalk.red(err));
            } else {
                spinner.succeed();
                console.log(symbols.success, chalk.green('Project initialized successfully'));

            }
        })
    } else {
        console.log(symbols.error, chalk.red("该目录下已存在同名文件夹!"));
    }
}

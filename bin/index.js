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
const { init } = require("../init");

commander
    .version(pkg.version)
    .option("<name>")
    .option("--ts <name>")
    .option("--mobx <name>")
    .option("--ts-mobx <name>")
    .option("");

commander.on("--help", function(){
    console.log("");
    console.log("create app with react hooks");
    console.log("");
    console.log("Example:");
    console.log("");
    console.log(` ${chalk.bgYellow(" Basic: ")}`);
    console.log(`     create-react-zlv ${chalk.green("<your_project_name_here>")}`);
    console.log("");
    console.log(` ${chalk.bgYellow(" Basic Typescript: ")}`);
    console.log(`     create-react-zlv ${chalk.red("--ts")} ${chalk.green("<your_project_name_here>")}`);
    console.log("");
    console.log(` ${chalk.bgYellow(" Basic with Mobx: ")}`);
    console.log(`     create-react-zlv ${chalk.red("--mobx")} ${chalk.green("<your_project_name_here>")}`);
    console.log("");
    console.log(` ${chalk.bgYellow(" basic Typescript with Mobx: ")}`);
    console.log(`     create-react-zlv ${chalk.red("--ts-mobx")} ${chalk.green("<your_project_name_here>")}`);
    console.log("");
});

commander.parse(process.argv);

if (commander.ts) {
    console.log("React + Typescript");
    console.log(config.branch.ts, commander.ts);
    init(config.branch.ts, commander.ts);
} else if (commander.mobx){
    console.log("React + Mobx");
    init(config.branch.mobx, commander.mobx);
} else if (commander.tsMobx) {
    console.log("React + Typescript + Mox");
    init(config.branch.tsMobx, commander.tsMbox);
} else {
    console.log("React basic");
    console.log(commander);
}



// if (commander.init) {
//     const spinner = ora('正在初始化项目...');
//     const { gitUrl, branch } = config;
//     let projectPath = path.resolve(commander.init);
//     const projectName = path.win32.basename(projectPath);
//     if (!fs.existsSync(projectName)) {
//         console.log(`${chalk.red("Init project in:  ")}${chalk.green(projectName)}`);
//         spinner.start();
//         download(`direct:${gitUrl}#${branch}`, projectName, { clone: true }, err => {
//             if (err) {
//                 spinner.fail();
//                 console.log(symbols.error, chalk.red(err));
//             } else {
//                 spinner.succeed();
//                 console.log(symbols.success, chalk.green('Project initialized successfully'));
//
//             }
//         })
//     } else {
//         console.log(symbols.error, chalk.red("该目录下已存在同名文件夹!"));
//     }
// } else {
//     console.log(process.argv);
// }

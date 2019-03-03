#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs-extra");
const shelljs = require("shelljs");
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
   console.log("  create-react-zlv <your_project_name_here>");
   console.log("");
   console.log("");
});

commander.parse(process.argv);

if (commander.init) {
    const { gitUrl, branch } = config;
    var projectPath = path.resolve(commander.init);
    var projectName = path.win32.basename(projectPath);
    console.log(`${chalk.red("init project in ")}${chalk.green(projectName)}`);
    console.log(gitUrl, branch, projectName);
    shelljs.exec(`git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`);
}


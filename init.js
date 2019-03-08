const chalk = require("chalk");
const ora = require('ora');
const fs = require("fs-extra");
const shelljs = require("shelljs");
const symbols = require('log-symbols');
const git = require('isomorphic-git');
const config = require("./config");

git.plugins.set("fs", fs);

var init = (branch, name) => {
    const spinner = ora('正在初始化项目...');
    const { gitUrl } = config;
    if (!fs.existsSync(name)) {
        console.log(`${chalk.red("Init project in:  ")}${chalk.green(name)}`);
        spinner.start();
        git.clone({
            url: gitUrl,
            singleBranch: true,
            depth: 1,
            ref: branch,
            dir: name,
            noTags: true,
        }).then(() => {
            shelljs.rm("-rf", `${name}/.git`);
            spinner.succeed();
            console.log(symbols.success, chalk.green('Project initialized successfully'));
            showExtra();
        }).catch((err) => {
            spinner.fail();
            console.log(symbols.error, chalk.red(err));
        });
    } else {
        console.log(symbols.error, chalk.red("该目录下已存在同名文件夹!"));
    }
};

var showInfo = () => {
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
};

var showExtra = () => {
    console.log("");
    console.log(`${chalk.cyan("npm run dev")}`);
    console.log("   start the development server");
    console.log("");
    console.log(`${chalk.cyan("npm run build")}`);
    console.log("   bundle your app for production");
    console.log("");
    console.log(`${chalk.cyan("npm run dll")}`);
    console.log("   bundle dll.js and manifest.json");
    console.log("   NOTICE: if you need dll, you should edit USE_DLL as true in webpack/config/config.js");
    console.log("");
    console.log(`${chalk.cyan("npm run analysis")}`);
    console.log("   bundle your app for production and show you detail info about bundled files");
    console.log("");
    console.log(`${chalk.cyan("npm run lint-js")}`);
    console.log("   format your js,jsx,ts,tsx file by eslint");
    console.log("");
    console.log(`${chalk.cyan("npm run lint-css")}`);
    console.log("   format your .css, .less file by stylelint");
    console.log("");
    console.log(symbols.success, chalk.green('Project initialized successfully'));
    console.log(`${chalk.cyan("enjoy coding!")}`);
    console.log("");
};

module.exports = {
    init,
    showInfo
};

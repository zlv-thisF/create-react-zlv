const chalk = require("chalk");
const ora = require('ora');
const download = require("download-git-repo");
const fs = require("fs-extra");
const symbols = require('log-symbols');
const config = require("./config");

var init = (branch, name) => {
    const spinner = ora('正在初始化项目...');
    const { gitUrl } = config;
    if (!fs.existsSync(name)) {
        console.log(`${chalk.red("Init project in:  ")}${chalk.green(name)}`);
        spinner.start();
        download(`direct:${gitUrl}#${branch}`, name, { clone: true }, err => {
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
};

module.exports = {
    init,
};

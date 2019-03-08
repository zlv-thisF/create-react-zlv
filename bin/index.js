#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const pkg = require("../package");
const config = require("../config");
const { init, showInfo } = require("../init");

commander
    .version(pkg.version)
    .option("<name>")
    .option("--ts <name>")
    .option("--mobx <name>")
    .option("--ts-mobx <name>")
    .option("");

commander.on("--help", showInfo);

commander.parse(process.argv);

if (commander.ts) {
    console.log(`TYPE: ${chalk.bgYellow("React + Typescript")}`);
    init(config.branch.ts, commander.ts);
} else if (commander.mobx){
    console.log(`TYPE: ${chalk.bgYellow("React + Mobx")}`);
    init(config.branch.mobx, commander.mobx);
} else if (commander.tsMobx) {
    console.log(`TYPE: ${chalk.bgYellow("React + Typescript + Mobx")}`);
    init(config.branch.tsMobx, commander.tsMobx);
} else {
    console.log(`TYPE: ${chalk.bgYellow("React base")}`);
    init(config.branch.default, commander.args[0]);
}

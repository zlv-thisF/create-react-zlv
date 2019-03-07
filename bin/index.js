#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
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
    console.log(symbols.info, "React + Typescript", symbols.info);
    init(config.branch.ts, commander.ts);
} else if (commander.mobx){
    console.log(symbols.info, "React + Mobx", symbols.info);
    init(config.branch.mobx, commander.mobx);
} else if (commander.tsMobx) {
    console.log(symbols.info, "React + Typescript + Mox", symbols.info);
    init(config.branch.tsMobx, commander.tsMbox);
} else {
    console.log(symbols.info, "React basic", symbols.info);
    init(config.branch.default, commander.args[0]);
}

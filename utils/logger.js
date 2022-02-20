const chalk = require('chalk');

const info = (...args) => {
    console.log(chalk.green("INFO: ", args.join(" | ")));
}
const warn = (...args) => {
    console.log(chalk.yellow("WARNING: ", args.join(" | ")));
}
const error = (...args) => {
    console.log(chalk.red("ERROR: ", args.join(" | ")));
}

// info - функция выводит сообщение в терминал/консоль в зеленом цвете
// warn - выводит сообщение в желтом
// error - выводит в красном

module.exports = {
    info,
    warn,
    error
}
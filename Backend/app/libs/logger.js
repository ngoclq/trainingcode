import chalk from 'chalk';

const error = err => {
  console.error(chalk.red(err));
};

const info = msg => {
  console.info(chalk.green(msg));
};

const warning = msg => {
  console.warn(chalk.yellow(msg));
};

const tick = msg => {
  console.log(`${msg} ${chalk.green('✓')}`);
};

const command = (cmd, msg) => {
  console.log(`${chalk.blue(`Press ${chalk.italic(cmd)} to ${msg}`)}`);
};

module.exports = {
  error,
  info,
  warning,
  tick,
  command
};

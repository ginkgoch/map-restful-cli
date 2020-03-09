import program from 'commander';
import appInfo from '../package.json';
import * as commands from './commands';

let app = new program.Command();
app.version(appInfo.version).usage('command [options]').description('This is a map command line tool template.');

Object.values(commands).forEach(cmd => {
    let command = app.command(cmd.usage).description(cmd.desc);
    cmd.options.forEach(opt => command.option(opt.flags, opt.desc));
    command.action(cmd.action);
});

app.parse(process.argv);
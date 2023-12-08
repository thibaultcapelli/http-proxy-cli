#! /usr/bin/env node
const {program} = require('commander')
const run = require('./commands/run')
const packageJSON = require('./package.json');

program
    .name(packageJSON.name)
    .description(packageJSON.description)
    .version(packageJSON.version);

program
    .command('run')
    .description('Run a new http proxy')
    .option('-u, --uri <uri>', 'The URI of the server to proxy')
    .option('-p, --port <port>', 'The port to listen to')
    .option('-c --cors [cors...]', 'Add CORS middleware', "*")
    .option('--no-cors', 'Disable CORS')
    .action(run)

program.parse();

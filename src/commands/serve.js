import serve from './shared/Serve';

let serveCommand = {
    usage: 'serve',
    desc: 'Serve a mapping RESTful API services',
    options: [
        { flags: '-p, --port <port>', desc: 'The port of the service, default is 3000' },
        { flags: '-c, --config <config>', desc: 'The map configure file, default is a demo map' },
        { flags: '-e, --plugins <plugins>', desc: 'The plugin directory, must be in the project node modules scope' },
    ],
    action(cmd) {
        serve(cmd);
    }
};

export { serveCommand };
import serve from './shared/Serve';

let serveCommand = {
    usage: 'serve',
    desc: 'Serve a mapping RESTful API services',
    options: [
        { flags: '-p, --port <port>', desc: 'The port of the service, default is 3000' },
        { flags: '-c, --config <config>', desc: 'The map configure file, default is a demo map' },
        { flags: '-e, --plugins', desc: 'Enable plugins' },
    ],
    action(cmd) {
        let { port, config, plugins } = cmd;
        if (port === undefined) {
            port = 3000;
        }

        serve(port, config, plugins);
    }
};

export { serveCommand };
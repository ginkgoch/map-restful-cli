import os from 'os';
import cluster from 'cluster';
import serve from './shared/Serve';

let clusterCommand = {
    usage: 'cluster',
    desc: 'Serve a mapping RESTful API services in cluster mode',
    options: [
        { flags: '-p, --port <port>', desc: 'The port of the service, default is 3000' },
        { flags: '-c, --config <config>', desc: 'The map configure file, default is a demo map' },
        { flags: '-n, --slaves <slave>', desc: 'The count of slave, must be greater than 0, default is cpu core count' },
        { flags: '-e, --plugins <pluginDir>', desc: 'The plugin directory, must be in the project node modules scope' },
    ],
    action(cmd) {
        let { port, config, slaves, plugins } = cmd;
        if (port === undefined) {
            port = 3000;
        }

        if (slaves === undefined) {
            slaves = os.cpus().length;
        }

        if (cluster.isMaster) {
            console.log(`Master process <${process.pid}> launches`);
            console.log(`Prepare to folk ${slaves} processes`);

            for (let i = 0; i < slaves; i++) {
                cluster.fork({ isSlave: true, port, config });
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log(`Worker process <${worker.process.pid}> exits with signal ${signal}`);
            });
        }
        else {
            serve(port, config, plugins);
        }
    }
};

export { clusterCommand };
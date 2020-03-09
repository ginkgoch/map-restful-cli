import Koa from "koa";
import compress from 'koa-compress';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { MapRouter } from 'ginkgoch-koa-map-router';
import { MapUtils } from './shared/MapUtils';

let serveCommand = {
    usage: 'serve',
    desc: 'Serve a mapping RESTful API services',
    options: [
        { flags: '-p, --port <port>', desc: 'The port of the service, default is 3000' },
        { flags: '-c, --config <config>', desc: 'The map configure file, default is a demo map' },
    ],
    action(cmd) {
        let { port, config } = cmd;
        if (port === undefined) {
            port = 3000;
        }

        serve(port, config);
    }
};

function serve(port, config) {
    const app = new Koa();
    app.use(logger());
    app.use(cors());
    app.use(compress({
        threshold: 1024,
        filter: contentType => /image/i.test(contentType) || /json/i.test(contentType)
    }));

    let err = MapUtils.loadMapConfigure(config);
    if (err) {
        console.error('[ERR]', err);
        return;
    }

    let mapRouter = new MapRouter({ initMap: MapUtils.getInitMapEngine }).getRouter();
    app.use(mapRouter.routes()).use(mapRouter.allowedMethods());

    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
}

export { serveCommand };
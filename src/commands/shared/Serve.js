import Koa from "koa";
import compress from 'koa-compress';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { MapRouter } from 'ginkgoch-koa-map-router';
import { MapUtils } from './MapUtils';

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
        console.log(`Server listening on http://localhost:${port} <process id: ${process.pid}>`);
    });
}

export default serve;
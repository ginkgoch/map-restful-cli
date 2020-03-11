import Koa from "koa";
import compress from 'koa-compress';
import cors from '@koa/cors';
import logger from 'koa-logger';
import Router from 'koa-router';
import { MapRouter } from 'ginkgoch-koa-map-router';
import { MapUtils } from './MapUtils';
import appInfo from '../../../package.json';

function serve(port, config, plugins = undefined) {
    const app = new Koa();
    app.use(logger());
    app.use(cors());
    app.use(compress({
        threshold: 1024,
        filter: contentType => /image/i.test(contentType) || /json/i.test(contentType)
    }));

    let maps = new Array();
    let err = MapUtils.loadMapsFromConfigure(config, maps);
    if (err) {
        console.error('[ERR]', err);
        return;
    }

    // load plugins
    MapUtils.loadMapsFromPlugin(plugins, maps);

    let mapRouter = new MapRouter({ maps, initMap: MapUtils.initMap }).getRouter();
    app.use(mapRouter.routes()).use(mapRouter.allowedMethods());

    let versionRouter = getVersionRouter();
    app.use(versionRouter.routes()).use(versionRouter.allowedMethods());

    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port} <process id: ${process.pid}>`);
    });
}

function getVersionRouter() {
    let versionRouter = new Router();
    versionRouter.get('/version', ctx => {
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
            version: appInfo.version,
            author: 'Ginkgoch'
        };
    });

    return versionRouter;
}

export default serve;
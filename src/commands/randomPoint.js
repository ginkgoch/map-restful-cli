import * as G from 'ginkgoch-map';

let randomPointCommand = {
    usage: 'random-point',
    desc: 'Generate a random point in WGS',
    options: [
        { flags: '-f, --format <format>', desc: 'Output format of generated point. Options: WKT | WKB | GeoJSON. Default is WKT' }
    ],
    action(cmd) {
        let format = cmd.format || 'WKT';
        let [x, y] = [Math.random() * 360 - 180, Math.random() * 180 - 90]; 
        let point = new G.Point(x, y);

        switch(format.toLowerCase()) {
            case 'wkt':
                console.log(point.toWKT());
                break;
            case 'wkb':
                console.log(point.toWKB().toString('base64'));
                break;
            case 'geojson':
                console.log(JSON.stringify(point.toJSON()));
                break;
            default:
                console.log('Not supported output format');
        }

        return true;
    }
};

export { randomPointCommand };
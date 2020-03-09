import fs from 'fs';
import path from 'path';
import { MapEngine, Srs, ShapefileFeatureSource, FeatureLayer, FillStyle, Projection } from "ginkgoch-map";

const CRS_GOOGLE = 'EPSG:900913';
const configuredMaps = new Map();
export class MapUtils {
    static loadMapConfigure(config) {
        if (config === undefined) {
            return;
        }
        else if (!fs.existsSync(config)) {
            return `Configure file '${config}' not exists`;
        }

        let content = fs.readFileSync(config).toString();

        try {
            let contentJSON = JSON.parse(content);
            if (!Array.isArray(contentJSON)) {
                contentJSON = [contentJSON];
            }
    
            for (let i = 0, length = contentJSON.length; i < length; i++) {
                let mapEngine = MapEngine.parseJSON(contentJSON[i]);
                configuredMaps.set(mapEngine.name, mapEngine);
            }
        }
        catch(ex) {
            return `Map configure is invalid or empty. ` + ex;
        }
    }

    static getInitMapEngine(name) {
        let mapEngine = configuredMaps.get(name);
        if (mapEngine !== undefined) {
            return mapEngine;
        }

        // Create a engine with size 256 * 256 pixels
        mapEngine = new MapEngine(256, 256);
        mapEngine.name = name;

        // Init the map rendering spatial reference system
        mapEngine.srs = new Srs(CRS_GOOGLE);

        let sourcePath = path.resolve(__dirname, '../data/cntry02.shp');

        // Create a feature source instance
        let source = new ShapefileFeatureSource(sourcePath);
        source.projection = new Projection(CRS_GOOGLE, CRS_GOOGLE);
        
        // Create a feature layer instance
        let layer = new FeatureLayer(source);

        // Define a style for feature layer
        layer.styles.push(new FillStyle('#f0f0f0', '#636363', 1));

        // Push the feature layer into map
        mapEngine.pushLayer(layer);

        return mapEngine;
    }
}
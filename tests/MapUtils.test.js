import path from 'path'
import { MapUtils } from '../src/commands/shared/MapUtils';

describe('MapUtils tests', () => {
    it('loadMapsFromPlugin', () => {
        let maps = new Array();
        MapUtils.loadMapsFromPlugin(path.resolve(__dirname, 'plugins'), maps);
        expect(maps.length).toBe(1);
    });
})

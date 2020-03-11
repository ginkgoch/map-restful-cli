import path from 'path'
import { getPlugins } from '../src/commands/shared/PluginUtils';

describe('PluginUtils tests', () => {
    it('getPlugins', () => {
        let plugins = getPlugins(path.resolve(__dirname, 'plugins'));
        expect(plugins.length).toBe(3);
    });
})

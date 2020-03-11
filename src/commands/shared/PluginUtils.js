import fs from 'fs';
import path from 'path';

export function getPlugins(pluginsDir) {
    if (!fs.existsSync(pluginsDir)) {
        return [];
    }

    let modules = fs.readdirSync(pluginsDir).filter(f => path.extname(f) === '.js').map(f => path.resolve(pluginsDir, f)).map(f => require(f)).filter(m => m.getMap !== undefined);
    return modules;
}
const { MapEngine } = require('ginkgoch-map').default.all;

module.exports = {
    getMap() {
        return new MapEngine();
    }
}
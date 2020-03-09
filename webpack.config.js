const path = require('path');
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index'),
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
    libraryTarget: 'umd'
  },
  node: {
    __dirname: false
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          ["@babel/preset-env"]
        ]
      }
    }]
  },
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  externals: {
    ...getExternals()
  },
  devtool: 'source-map'
};

function getExternals() {
  let modules = ['canvas', 'koa', 'koa-body'];
  let externals = {};
  modules.forEach(m => {
    externals[m] = {
      commonjs: m,
      commonjs2: m,
      amd: m,
      root: m
    };
  });

  return externals;
}
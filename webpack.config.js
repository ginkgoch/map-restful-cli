const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
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
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, '/dist/'),
  //   inline: true,
  //   host: 'localhost',
  //   port: 8080,
  // }
};
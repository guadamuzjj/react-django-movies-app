var path = require('path');

module.exports = {
  context: __dirname,
  entry: './moviesapp/src/index',
  output: {
    path: path.resolve('./moviesapp/static/js'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }

};

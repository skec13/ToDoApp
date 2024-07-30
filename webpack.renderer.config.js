const rules = require('./webpack.rules');

rules.push(
  {
    test: /\.(scss)$/, // all scss files will be handled
    // Use loaders in that specific reverse order
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader'
      }
    ]
  },
  /*
  {
    test: /\.(png|jpe?g|gif|ico|svg)$/, // We will handle of these file extensions
    use: [
      {
        loader: "file-loader",
      }
    ]
  }
  */
  {
    test: /\.png$/,
    use: {
      loader: 'file-loader',
    }
  }

);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};

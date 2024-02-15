const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Changed devtool for Webpack 5 compatibility
  devtool: 'source-map', 
  entry: './docs/entry.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      atomize: path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // For CSS files
      },
      {
        test: /\.scss$/, // For SCSS files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Interprets @import and url() like import/require() and resolves them
          'sass-loader',  // Loads and compiles SCSS files
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  // Updated devServer configuration for Webpack 5
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    compress: true, // Enables gzip compression for everything served
    port: 8080, // Default port for webpack-dev-server
    allowedHosts: 'all', // This allows all hostnames to access the dev server
    open: true, // Open the browser after server had been started
    hot: "only", // Enables Hot Module Replacement without page refresh as a fallback in case of build failures
  },
};

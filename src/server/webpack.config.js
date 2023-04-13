const path = require('path');
module.exports = {
    entry: "./public/distSrc/mainPage.js",
    mode:'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
        modules: [ path.resolve('./src'), path.resolve('./node_modules'), ],
        extensions: ['.ts', '.js'],
        fallback: {
          "fs": false,
          "tls": false,
          "net": false,
          "path": false,
          "zlib": false,
          "http": false,
          "https": false,
          "stream": false,
          "crypto": false,
          "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        } 
      },
    output: {
      filename: "mainPage.js",
      path: path.resolve(__dirname, "public/distSrc"),
    },
  };



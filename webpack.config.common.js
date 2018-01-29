const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/Tools.js',
    output: {
        filename: 'js/xwtools.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'xwtools',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default',
    },
  	module: {
  		loaders: [
  		    {
	            test: /\.js$/,
	            exclude: /node_modules/,
	            loader: 'jshint-loader',
	            //this is similar to defining a preloader
	            enforce: 'pre'
	        },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    watchOptions: {
        poll: true
    },
};
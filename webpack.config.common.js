const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/Tools.js',
    output: {
        filename: 'js/main.js',
    	path: path.resolve(__dirname, 'dist')
    },
  	module: {
  		loaders: [
  		    /*{
	            test: /\.js$/,
	            exclude: /node_modules/,
	            loader: 'jshint-loader',
	            //this is similar to defining a preloader
	            enforce: 'pre'
	        },*/
            /*{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }*/
        ]
    },
    stats: {
        colors: true
    },
    watchOptions: {
        poll: true
    },
};
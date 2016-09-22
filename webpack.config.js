'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	entry: {
		main: './app/main'
	},
	output: {
		path: __dirname + '/build',
		filename: 'build.js',
		library: 'main'	
	},

	watch: NODE_ENV === 'development',

	watchOptions: {
		aggregateTimeout: 200
	},

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)	
		})
	],

	resolve: {
		moduleDirectories: ['node_modules'],
		extensions: ['', '.js']
	},

	resolveLoader: {
		moduleDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', "*"],
		extensions: ['', '.js']
	},

	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader?presets[]=es2015'
		}]
	}
};

if (NODE_ENV == 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);
};
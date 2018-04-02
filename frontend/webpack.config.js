'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		path.join(__dirname, 'index.jsx')
	],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: '[name].js',
		publicPath: '/'
	},
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.tpl.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new webpack.ProvidePlugin({
      "React": "react",
   	}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development')
		})
	],
	module: {
		loaders: [
			{
				test: /\.js|.jsx?$/,
				exclude: /node_modules/,
        loader: 'babel-loader'
			}, 
			{
				test: /\.json?$/,
				loader: 'json'
			},
			{
		    test: /\.(jpe?g|png|gif|svg|ico)$/i,
		    loaders: [
		      'file?hash=sha512&digest=hex&name=[hash].[ext]',
		      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
		    ]
		  },
			{
        test: /\.sass$/,
        loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
			},
			// {
			// 	test: /\.sass/,
			// 	loaders: ["style", "css", "sass"]
			// },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

			{ test: /\.css$/, loader: 'style!css'}
		]
	}
};
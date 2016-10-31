var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
module.exports = {
    entry: [
        './app/views/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, include: __dirname + '/app', loader: "babel-loader"}
        ]
    },
    plugins: [HTMLWebpackPluginConfig,
        new webpack.ProvidePlugin({
            'React':     'react',
            'ReactDom': 'react-dom',
            'axios': 'axios'
        })]
};
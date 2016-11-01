/*
* Fichier de configuration de Webpack
* Il faut simplement lancé la commande "webpack" pour qu'il traduise les fichiers ".js"
* présent dans le dossier views et qu'il mettent à jour le fichier index.html.
*
* Webpack utilise Babel pour "traduire" le language react.
*
*Le fichier présent doit être à la racine.
* */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/*
* Merge le fichier index original et les modifications que Webapp a à apporté
* dans un nouveau fichier index dans /dist
* */
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/views/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    //Le point d'entré de l'app react
    entry: [
        __dirname + '/app/views/js/index.jsx'
    ],
    module: {
        //Appel de Babel
        loaders: [
            {
            test: /\.jsx$/,
            include: __dirname + '/app',
            exclude: /node_modules/,
            loader: "babel-loader"
            }
        ]
    },
    //Le dossier de sortie
    output: {
        filename: "index_bundle.js",
        path: __dirname + '/dist'
    },
    plugins: [HTMLWebpackPluginConfig,
        // Importe automatiquement les .js nécessaire lorsque l'une de ces fonctions est appelé
        new webpack.ProvidePlugin({
            'React':     'react',
            'ReactDom': 'react-dom',
            'axios': 'axios'
        })]
};
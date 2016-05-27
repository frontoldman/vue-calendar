/**
 * Created by 52913 on 2016/5/13.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:[
        './index'
    ],
    output:{
        path : path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename : 'bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/]
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.css$/,
                loader: "style!css",
                include : __dirname
            }
        ]
    }
}

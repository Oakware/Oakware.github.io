const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const wpmode = 'development';
// const wpmode = 'production';

module.exports = {
    context: __dirname,
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: wpmode,
    devtool: 'inline-source-map',
    resolve: {
        extensions: [
            '.js', '.jsx', '.ts', '.tsx', '.coffee',
            '.css', '.less', '.sass', '.scss', '.styl'
        ]
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'es2015', 'react' ]
                    }
                }]
            }, {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }]
            }, {
                test: /\.coffee$/,
                use: [{
                    loader: 'coffee-loader',
                    options: {
                        transpile: { presets: [ 'es2015', 'react' ] }
                    }
                }]
            }, {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }, {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ]
            }, {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }, {
                test: /\.sass$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }, {
                test: /\.styl$/,
                use: [ 'style-loader', 'css-loader', 'stylus-loader' ]
            }
        ]
    },
    plugins: [
        new ProgressPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ]
};

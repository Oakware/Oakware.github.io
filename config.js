const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode  = 'development';
const prodMode = 'production';

let features = {
    'babel': (config, mode) => addJsLanguage(config, {
        extensions: [ '.js', '.jsx' ],
        rule: {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [ 'env', 'react' ]
                }
            }]
        }
    }),
    'typescript': (config, mode) => addJsLanguage(config, {
        extensions: [ '.ts', '.tsx' ],
        rule: {
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: { transpileOnly: true }
            }]
        },
        plugins: [ new ForkTsCheckerWebpackPlugin() ]
    }),
    'coffeescript': (config, mode) => addJsLanguage(config, {
        extensions: [ '.coffee' ],
        rule: {
            test: /\.coffee$/,
            use: [{
                loader: 'coffee-loader',
                options: {
                    transpile: { presets: [ 'env', 'react' ] }
                }
            }]
        }
    }),
    'css': (config, mode) => addCssLanguage(config, mode, {
        extensions: [ '.css' ],
        test: /\.css$/
    }),
    'less': (config, mode) => addCssLanguage(config, mode, {
        extensions: [ '.less' ],
        test: /\.less$/,
        loader: 'less-loader'
    }),
    'sass': (config, mode) => addCssLanguage(config, mode, {
        extensions: [ '.sass', '.scss' ],
        test: /\.s[ac]ss$/,
        loader: 'sass-loader'
    }),
    'stylus': (config, mode) => addCssLanguage(config, mode, {
        extensions: [ '.styl' ],
        test: /\.styl$/,
        loader: 'stylus-loader'
    })
};

function addJsLanguage(config, lang) {
    config.resolve.extensions.push(...lang.extensions);
    config.module.rules.push(lang.rule);
    if (lang.plugins)
        config.plugins.push(...lang.plugins);
}

function addCssLanguage(config, mode, lang) {
    let rule = {
        test: lang.test,
        use: []
    };

    if (mode === devMode) {
        rule.use.push('style-loader');
        rule.use.push('css-loader');
        if (lang.loader) rule.use.push(lang.loader);
    } else if (mode === prodMode) {
        rule.use.push(MiniCssExtractPlugin.loader);
        rule.use.push('css-loader');
        if (lang.loader) rule.use.push(lang.loader);
    }

    config.resolve.extensions.push(...lang.extensions);
    config.module.rules.push(rule);
}

function addFeatures(config, mode, useFeatures) {
    for (let feature of useFeatures) {
        features[feature](config, mode);
    }
}

function getWebpackConfig(mode) {
    mode = mode || process.env.NODE_ENV || devMode;
    let buildDir = 'build';
    let useFeatures = ['babel', 'coffeescript', 'css', 'sass'];

    let config = {
        context: __dirname,
        entry: {
            index: './src/index/index.coffee',
            projects: './src/projects/index.jsx'
        },
        output: {
            path: path.resolve(__dirname, buildDir),
            filename: 'js/[name].bundle.js'
        },
        mode: mode,
        devServer: {
            contentBase: './' + buildDir,
            compress: true,
            port: 9000
        },
        resolve: { extensions: [] },
        module: { rules: [] },
        plugins: [],
        optimization: {
            splitChunks: { chunks: 'all' }
        }
    };

    addFeatures(config, mode, useFeatures);

    config.plugins.push(
        new HtmlWebpackPlugin({
            template: './src/index/index.html',
            filename: 'index.html',
            chunks: [ 'index' ],
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            template: './src/projects/index.html',
            filename: 'projects/index.html',
            chunks: [ 'projects' ],
            inject: 'head'
        })
    );

    if (mode === devMode) {
        config.devtool = 'inline-source-map';
    } else if (mode === prodMode) {
        config.plugins.push(new MiniCssExtractPlugin({
            filename: "css/[name].bundle.css",
        }));
    }

    return config;
}

exports.getWebpackConfig = getWebpackConfig;

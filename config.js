const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devMode  = 'development';
const prodMode = 'production';

const features = {
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
    }),
    'url': (config, mode) => addJsLanguage(config, {
        rule: {
            test: /\.(png|jpg|gif|svg)$/i,
            use: [{
                loader: 'url-loader',
                options: { limit: 8192 }
            }]
        }
    })
};

const entries = {
    index: {
        js: './src/index/index.coffee',
        html: './src/template.html',
        path: 'index.html'
    },
    projects: {
        js: './src/projects/index.jsx',
        html: './src/template.html',
        path: 'projects/index.html'
    }
};

function addJsLanguage(config, lang) {
    if (lang.extensions)
        config.resolve.extensions.push(...lang.extensions);
    if (lang.plugins)
        config.plugins.push(...lang.plugins);
    config.module.rules.push(lang.rule);
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

function addEntries(config, entries) {
    for (let entryName in entries) {
        let entry = entries[entryName];
        config.entry[entryName] = entry.js;
        config.plugins.push(new HtmlWebpackPlugin({
            template: entry.html,
            filename: entry.path,
            chunks: [ entryName ],
            inject: 'head'
        }));
    }
}

function getWebpackConfig(mode) {
    mode = mode || process.env.NODE_ENV || devMode;
    let buildDir = 'build';
    let useFeatures = ['babel', 'coffeescript', 'css', 'sass'];

    let config = {
        mode: mode,
        context: __dirname,
        entry: {},
        output: {
            path: path.resolve(__dirname, buildDir),
            filename: 'js/[name].bundle.js'
        },
        resolve: { extensions: [] },
        module: { rules: [] },
        plugins: [],
        optimization: {
            splitChunks: { chunks: 'all' }
        },
        devServer: {
            contentBase: './' + buildDir,
            compress: true,
            port: 9000
        }
    };

    addFeatures(config, mode, useFeatures);
    addEntries(config, entries);

    if (mode === devMode) {
        config.devtool = 'inline-source-map';
    } else if (mode === prodMode) {
        config.plugins.push(new MiniCssExtractPlugin({
            filename: "css/[name].bundle.css",
        }));
    }

    config.plugins.push(new CopyWebpackPlugin([
        { from: 'src/resources', to: 'resources'}
    ]));

    return config;
}

exports.getWebpackConfig = getWebpackConfig;

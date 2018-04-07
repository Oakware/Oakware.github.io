const webpack   = require('webpack');
const config    = require('./webpack.config');

let compiler = webpack(config);
compiler.run(function () {
    console.log('Finished');
});

const config = require('./config');

module.exports = (env, argv) => config.getWebpackConfig(argv.mode);

const expressLoader = require('./express');

module.exports = async (app) => {
    // Loaders should be called here
    await expressLoader(app);
}
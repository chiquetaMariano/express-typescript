const expressLoader = require('./express');

export default async (app) => {
    // Loaders should be called here
    await expressLoader(app);
};
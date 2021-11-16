import config from './config';
import express from 'express';
import loaders from './loaders';

async function startServer(): Promise<void> {
    const app = express();

    await loaders(app);

    app.listen(config.port, () => {
        console.log(`Server listening on port: ${config.port}`);
    }).on('error', err => {
        console.error(err);
        process.exit(1);
    });
}

startServer();
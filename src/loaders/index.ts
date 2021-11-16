import expressLoader from './express';
import { Application as expressApplication } from 'express';

export default async (app: expressApplication) => {
    // Loaders should be called here
    await expressLoader(app);
};
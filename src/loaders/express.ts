import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import indexRouter from '../routes';

export default (app: express.Application ) => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);

    // avoid messing the output with favicon requests
    app.get('/favicon.ico', (req, res) => res.status(204));

    return app;
};

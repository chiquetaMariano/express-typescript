const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const indexRouter = require('../routes');

module.exports = (app) => {
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

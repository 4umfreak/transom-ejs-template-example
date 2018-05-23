'use strict';

const Transom = require('@transomjs/transom-core');
const transomTemplate = require('@transomjs/transom-ejs-template');

const transom = new Transom();

transom.configure(transomTemplate);

// ****************************************************************************
// This sample app doesn't use any metadata from the API definition.
// ****************************************************************************
const myApi = require('./myApi');
console.log("Running " + myApi.name);


// Initialize my TransomJS API metadata.
transom.initialize(myApi).then(function (server) {

    // ****************************************************************************
    // Define a simple '/' route to render a web page.
    // ****************************************************************************
    server.get('/', function (req, res, next) {

        req.log.trace('This is a TRACE entry.');
        req.log.debug('This is a DEBUG entry.');
        req.log.info('This is a INFO entry.');
        req.log.warn('This is a WARN entry.');
        req.log.error('This is a ERROR entry.');
        req.log.fatal('This is a FATAL entry.');
        server.log.warn('SERVER can do logging too!');

        // Fetch the configured Template module from the Registry.
        const template = server.registry.get('transomTemplate');

        // Some simple data for insertion into the template.
        const data = {
            title: "Yo Dawg!",
            date: new Date(),
            year: new Date().getFullYear()
        };
        const content = template.renderHtmlTemplate('index', data);

        // Tell the browser what type of content we're sending.
        res.setHeader('content-type', 'text/html');
        res.end(content);
        next(false);
    });

    // ****************************************************************************
    // Handle 404 errors when a route is undefined.
    // ****************************************************************************
    server.get('.*', function (req, res, next) {
        var err = new Error(req.url + " does not exist");
        err.status = 404;
        next(err);
    });

    // ****************************************************************************
    // Handle Errors within the app as our last middleware.
    // ****************************************************************************
    server.use(function (error, req, res, next) {
        console.error("Error handler", error);
        var data = {};
        data.error = error;
        res.statusCode = error.status || 501;
        res.send(data);
    });

    // ****************************************************************************
    // Start the Transom server...
    // ****************************************************************************
    server.listen(7070, function () {
        console.log('%s listening at %s', server.name, server.url);
    });

});


// ****************************************************************************
// Handle uncaught exceptions within your code.
// ****************************************************************************
process.on('uncaughtException', function (err) {
    console.error('Really bad Error!', err);
});

// ****************************************************************************
// Handle uncaught rejections within your code.
// ****************************************************************************
process.on('unhandledRejection', function (err) {
    console.error('unhandledRejection', err);
});
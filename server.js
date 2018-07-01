//This file manually boots up our application 
const { createServer } = require('http');
const next = require('next');

const app = next({
    dev: process.env.NODE_DEV !== 'production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

//Tell the app to listen to port 3000
app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if(err) throw err;
        console.log('REady 3000');
    });
});
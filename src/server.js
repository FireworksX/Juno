
import express from 'express'
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import appPaths from './router/pathsApp' //Save paths for app [page]



let urlEncodeParser = bodyParser.urlencoded({
    extended: false
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(session({secret: 'juno', resave: false, saveUninitialized: true}));

app.use('/', appPaths);

http.listen(2000, (err) => {
    if (err) {
        throw err
    }
    console.log('Server started on 2000 port');
});

mongoose.connect('mongodb://localhost/juno', (err) => {
    if(err)
        throw err;
    console.log('Mongoose conected');
});


io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
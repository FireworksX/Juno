
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import appPaths from './router/pathsApp' //Save paths for app [page]

let app = express();

let urlEncodeParser = bodyParser.urlencoded({
    extended: false
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

app.use('/', appPaths);

app.listen(2000, (err) => {
    if (err) {
        throw err
    }
    console.log('Server started on 2000 port')
});

mongoose.connect('mongodb://localhost/juno', (err) => {
    if(err)
        throw err;
    console.log('Mongoose conected');
})
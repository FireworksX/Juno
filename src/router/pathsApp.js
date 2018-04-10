import express from 'express'
import bodyParser from 'body-parser'
import User from '../model/User'

let router = express.Router();

let urlencoded = bodyParser.urlencoded({
    extended: false
});

let user = new User();

router.get('/app', (req, res) => {
    res.render('application')
});

router.post('/register', urlencoded, (req, res) => {
    user.register(req.body).then( (resolve) => {
        res.send(resolve);
    }, (reject) => {
        res.send(reject);
    })
});


module.exports = router;
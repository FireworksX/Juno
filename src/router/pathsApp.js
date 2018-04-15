import express from 'express'
import bodyParser from 'body-parser'
import User from '../model/User'

let router = express.Router();

let urlencoded = bodyParser.urlencoded({
    extended: false
});

let user = new User();

router.get('/app', (req, res) => {
    res.render('application');
});

router.post('/profile', (req, res) => {
    if(!req.session.profile){
        req.session.profile = false;
    }
    res.send(req.session.profile);
});

router.post('/register', urlencoded, (req, res) => {
    user.register(req.body).then( (resolve) => {
        res.send(resolve);
    }, (reject) => {
        res.send(reject);
    })
});

router.post('/auth', urlencoded, (req, res) => {
    user.auth(req.body).then( (resolve) => {
        req.session.profile = resolve.object;
        req.session.profile.visit++;
        res.send(resolve)
    }, (reject) => {
       res.send(reject);
    });
});


module.exports = router;
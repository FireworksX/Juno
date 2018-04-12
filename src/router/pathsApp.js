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
    if(!req.session.profile){
        req.session.profile = '';
    }else{
        console.log(req.session.profile)
    }
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
        res.send(resolve)
    }, (reject) => {
       res.send(reject);
    });
});


module.exports = router;
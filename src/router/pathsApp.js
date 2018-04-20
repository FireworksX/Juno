import express from 'express'
import bodyParser from 'body-parser'
import User from '../model/User'
import Nodes from '../model/Nodes'

let router = express.Router();

let urlencoded = bodyParser.urlencoded({
    extended: false
});

let user = new User();
let node = new Nodes();

router.get('/app', (req, res) => {
    res.render('application');
});

router.post('/profile', (req, res) => {
    if(!req.session.profile){
        req.session.profile = false;
    }
    res.send(req.session.profile);
});

router.post('/profileAuto', (req, res) => {
    let obj = {
        firstName: "John",
        age: 0,
        visit: 0,
        role: "user",
        login: "spaceman",
        mail: "root@juno.com",
        password: "MTIwOTIyMzUwMT8zMjcwMzAzMjE/LTExNDY5NDUwNjc/LTEzOTgwNTEyMDU/LTEyMTM1Nj...",
        registerDate: '2018-04-12 12:36:17.290',
        progress: {
            nodes: [
                {
                    name: 'html',
                    enabled: true,
                    id: 0
                },
                {
                    name: 'js',
                    enabled: true,
                    id: 2
                }
            ]
        }
    };


    res.send(obj);
});

router.post('/getSession',urlencoded, (req, res) => {
    res.send(req.session.profile);
});

router.post('/getNodes',urlencoded, (req, res) => {
    node.getNodes().then( (resolve) => {
        res.send(resolve);
    }, (reject) => {
       res.send(reject);
    });
});

router.post('/getSessionAuto',urlencoded, (req, res) => {
    res.send({firstName: 'John', login: 'spaceman'});
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
        res.send(resolve);
    }, (reject) => {
       res.send(reject);
    });
});


module.exports = router;
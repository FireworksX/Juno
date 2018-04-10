import express from 'express'
import bodyParser from 'body-parser'

let router = express.Router();

let urlencoded = bodyParser.urlencoded({
    extended: false
});

router.get('/app', (req, res) => {
    res.render('application')
});

module.exports = router;
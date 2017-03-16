var express = require('express');
var router = express.Router();
var Messages = require('../models/models').Messages;
var log = require('morgan');

/* GET home page. */
router.get('/messages', function(req, res, next) {
    return Messages.find(function (err, messages) {
        if(!err){
            res.send(messages);
        }else{
            res.statusCode = 500;
            log.error('Internal error (%d): %s', res.statusCode, err.message);
        }
    })
});

router.post('/messages', function(req, res, next) {
    var date = new Date().toDateString();

    var message = new Messages({
        sender: req.body.sender,
        text: req.body.text,
        date: date
    });

    message.save(function (err) {
        if(!err){
            console.log('Messages added');
            res.send({status: "ok"});
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({status: 'error', error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({status: 'error', error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    })
});

module.exports = router;

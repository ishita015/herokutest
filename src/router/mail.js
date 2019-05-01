var express = require('express');
var router = express.Router();
// "use strict";
// const nodemailer = require("nodemailer");

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'anikesh13.linuxbean@gmail.com',
//         pass: '123456789'
//     }
// });

// const mailOptions = {
//     from: 'anikesh13.linuxbean@gmail.com', // sender address
//     to: 'anikesh13.linuxbean@gmail.com', // list of receivers
//     subject: 'node email', // Subject line
//     html: '<p>Gaon walo</p>'// plain text body
// };

// transporter.sendMail(mailOptions, function (err, info) {
//     if (err)
//         console.log(err)
//     else
//         console.log(info);
// });


const nodemailer = require('nodemailer');

var auth = {
    type: 'oauth2',
    user: 'anikesh13.linuxbean@gmail.com',
    clientId: '750996625982-f5thkr6f8g9qhipstf5gkqvrenb0b3lb.apps.googleusercontent.com',
    clientSecret: 'lrugk2mIo70jEfqPvyM7eq8E',
    refreshToken: '1/HdMojxMl_gZw7BnKFDdycV1m1V2bSsYHljVvhR82Hg4',
};

router.post('/', function(req, res){
    var mailOptions = {
        from: 'anikesh13.linuxbean@gmail.com',
        to: 'anikesh13.linuxbean@gmail.com',
        subject: 'My site contact from: ' ,
        text: 'fgdsgdfsgdfgds',
        // html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message,
    };
  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    });
  transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });
    res.end();
  })

module.exports = router;
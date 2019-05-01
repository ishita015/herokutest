var express = require('express');
var route = express.Router();
const UserData = require('../model/data');
var jwt = require('jsonwebtoken');

// function allData() {
//     return new Promise((resolve, reject) => {
//         UserData.find()
//             .then(data => {
//                 const token = jwt.sign({
//                     data
//                 },
//                     'secret',
//                     {
//                         expiresIn: "5h"
//                     });
//                 resolve(token);
//             })
//             .catch(err => {
//                 reject(err);
//             })
//     })
// }

// router.all("/all", (req, res) => {
//     allData()
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.send(err)
//         });
// });

// router.post('/login', (req, res) => {
//     UserData.find({ _id: req.body._id })
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.send(err)
//         })
// });

route.post('/authenticate', function (req, res) {
    // here check if the user is log in (use params from the 'req' object)
    // and generate a token with jwt

    // find the user
    UserData.findOne({
        firstName: req.body.firstName
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else {


            // check if password matches
            if (user.firstName != req.body.firstName) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                console.log('dsaaaa', user.firstName);

                // if user is found and password is right
                // create a token
                var token = jwt.sign({ user }, 'fdsfs', {
                    expiresIn: "5h" // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }
    });
});
// TODO: route middleware to verify a token
route.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {   

        // verifies secret and checks exp
        jwt.verify(token, 'fdsfs', function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// route to show a random message (GET http://localhost:3000/api/)
route.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

module.exports = route;
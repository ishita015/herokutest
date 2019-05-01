var express = require('express');
var router = express.Router();
const UserData = require('../model/data');

router.post("/addname", (req, res) => {
    const myData = new UserData({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

router.all("/all", (req, res) => {
    UserData.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        })
});

router.get("/user/:name", (req, res) => {
    UserData.find({ firstName: req.params.name })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        })
});

router.get("/updateHead/:id", (req, res) => {
    UserData.update({ _id: req.params.id }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
        .then(data => {
            res.status(201).json({
                message: 'Data Updated successfully',
            });
        })
        .catch(err => {
            res.send(err);
        })
});

router.post("/updateBody", (req, res) => {
    UserData.findByIdAndUpdate(req.body._id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
        .then(data => {
            res.status(201).json({
                message: 'Data Updated successfully',
            });
        })
        .catch(err => {
            res.send(err);
        })
});

router.delete("/delete", (req, res) => {
    UserData.findOneAndRemove(req.body._id)
        .then(data => {
            res.status(201).json({
                message: 'Data delete successfully',
            });
        })
        .catch(err => {
            res.send(err);
        })
});

router.get('/', function (req, res) {
    res.send('GET route on things.');
});
router.post('/', function (req, res) {
    res.send('POST route on things.');
});

module.exports = router;
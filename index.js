var express = require('express');
var app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connect = require('./src/connection/connect');
var route = require('./src/router/route');
var upload = require('./src/router/upload');
var mail = require('./src/router/mail');
var jwt = require('./src/router/jwt');

mongoose.connect(connect.url, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Database");
    }).catch(err => {
        console.log(err);
        process.exit();
    });

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "*"
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/route', function (req, res, next) {
    console.log("A request for things received at " + Date.now());
    next();
});

app.use('/route', route);
app.use(express.static('./src/uploads'));
app.use('/upload', upload);
app.use('/mail', mail);
app.use('/jwt', jwt);

app.get('**', function (req, res) {
    res.send('Sorry, this is an invalid URL...');
});

app.listen(process.env.PORT || 3000); 
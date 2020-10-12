const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const whitelist = ['https://constantin-dot.github.io','http://localhost:3000'];


app.use(cors({
    origin: whitelist,
    methods: "GET,PUT,POST,DELETE, OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204
}));

app.use(function(req, res, next) {
    if(whitelist.indexOf(req.headers.origin) > -1) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let SMTP_LOGIN = process.env.SMTP_LOGIN;
let SMTP_PASSWORD = process.env.SMTP_PASSWORD;

let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: SMTP_LOGIN,
        pass: SMTP_PASSWORD
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {
    let { name, email,  message} = req.body;
    try {
        await transporter.sendMail({
            from: "My profile page",
            to: "ivan.yar777@gmail.com",
            subject: "New response",
            html: `<b>Message from your portfolio page</b>
               <div>name: ${name}</div>
               <div>email: ${email}</div>
               <div>message: ${message}</div>`
        });
        res.send("ok");
    } catch (err) {
        console.log(err)
        res.send(err);
    }
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
    console.log('Example app listening on port 3010!');
})
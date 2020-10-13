const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


let transporter = nodemailer.createTransport({
    service: "gmail",
    secure:false,
    port:25,
    tls: {
      rejectUnauthorized:false
    },
    auth: {
        user:"ivan.yar777@gmail.com" ,
        pass: 'ilove19917773'
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {
    let { name, email,  message} = req.body;
    try {
        await transporter.sendMail({
            from: 'Portfolio Page',
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
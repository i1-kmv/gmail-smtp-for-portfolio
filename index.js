const cors = require('cors');
const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.Port || 3010;
let smtp_login = process.env.SMTP_LOGIN || '';
let smtp_password = process.env.SMTP_PASSWORD || '';


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
});

app.get('/', async function (req, res) {
    res.send('heeeeell')
});

app.post('/sendMessage', async function (req, res) {

    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: 'My ProfilePage',
        to: "ivan.yar777@gmail.com",
        subject: "Mail from gmail",
        html: `<b>Сообщение с Вашего портфолио</b>
        <div>
             name: ${name}
        </div>
        <div>
             email: ${email}
        </div>
        
        <div>
             ${message}
        </div>`
    });

    res.send('ok')
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

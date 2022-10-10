const nodemailer = require('nodemailer');


const enviar = (to, subject, text) => {


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jesusramospruebag8@gmail.com',
            pass: 'desafiolatamg8'
        },
    });

    let mailOptions = {
        from: 'jesusramospruebag8@gmail.com',
        to: `${to}`,
        subject: `${subject}`,
        html: `${text}`
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        };
        if (data) {
            console.log(data);
        };
    });
};



module.exports = enviar;


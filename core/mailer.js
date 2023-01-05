'use strict';

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.komlankamekpo.pro",
    port: 465,
    secure: !0,
    connectionTimeout: 60*1000,
    socketTimeout: 60*1000,
    greetingTimeout: 20*1000,
    auth: {
        user: "dev@komlankamekpo.pro",
        pass: "20GmoD3v"
    }
});


const domain_name = "drawoo.io";
const no_reply_email = `Drawoo no-reply  <no-reply@${domain_name}>`;

module.exports.email_confirmation = ({_token, _email}) => {

    return transporter.sendMail({
        from: no_reply_email,
        to: _email,
        replyTo: no_reply_email,
        subject: "Veuillez confirmer votre email - Drawoo",
        text: "",
        html: `Veuillez cliquer sur le lien suivant pour confirmer votre email: http://localhost:3000/email-confirmation/${_token}`
    });
};
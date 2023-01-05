const mailer = require('nodemailer')

module.exports = {
    mailSender : (req, res)=>{
        const transporter = mailer.createTransport({
            host :  "smtp-mail.outlook.com" ,
            secureConnection : false,
            port : 587,
            tls : {
                ciphers : "SSLv3",
            },
            auth : {
                user :  "devrost@outlook.com",
                pass : "mawugno12__"
            }
        })

        const mailOptions = {
            from :  "devrost@outlook.com",
            to : req.mail,
            subject : 'Confimation email  ',
            text : req.content
            
        }

        transporter.sendMail(mailOptions, (err, result)=>{
            if (err) {
                console.log(err);
                return res({
                    status : 'ERROR'
                })
            } else {
                console.log('Email sent: ' + result.response);

                return res(null, {
                    status : 'OK'
                })
            }
        })
    },

    mail_validator : (email) =>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) return !0;
        return !1
    }
       
}
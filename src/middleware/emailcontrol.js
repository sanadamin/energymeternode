var nodemailer = require('nodemailer');

module.exports = {
    sendEmail(email, textbody) {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'engtasktracker@gmail.com',
                pass: 'Umniah@123',
            },
        });


        let mailOptions = {
            from: '"[OverDue] Umniah Engineering Task Tracking System" <engtasktracker@gmail.com>',

            cc: email,
            subject: '[OverDue] Task Over Due ',
            html: '<div>' + textbody + '</div>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
	}

 

}


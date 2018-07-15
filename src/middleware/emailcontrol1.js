var nodemailer = require('nodemailer');

module.exports = {


    sendEmail(email, textbody,subject) {
        let transporter = nodemailer.createTransport({
            host: 'smtp2.batelco.jo',
            port: 25,
            secure: false,
            
        });


        let mailOptions = {
            from: '"['+ subject  +'] Umniah Engineering Task Tracking System" <engtasktracker@umniah.jo>',

            cc: email,
            subject: '['+ subject  +'] Task Over Due ',
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

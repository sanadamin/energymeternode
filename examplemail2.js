odemailer = require('nodemailer');

module.exports = {


    sendEmail(email, messages,subject) {
        let transporter = nodemailer.createTransport({
            pool:true,
            maxConnections:1,
	    host: 'smtp2.batelco.jo',
            port: 25,
            secure: false,

        });


        
         transporter.on('idle', function() {
            // send next message from the pending queue
            while (transporter.isIdle() && messages.length) {
                let mailOptions = {
                    from: '"['+ subject.shift()  +'] Umniah Engineering Task Tracking System" <engtasktracker@umniah.jo>',

            cc: email.shift(),
            subject: '['+ subject.shift()  +'] Task Over Due ',
            html: '<div>' + messages.shift() + '</div>'
 

                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
        });

    }
}




var nodemailer = require('nodemailer');

module.exports = {


    sendEmail(email, textbody,subject) {
        let transporter = nodemailer.createTransport({
	    host: 'smtp2.batelco.jo',
            port: 25,
            secure: false,

        });

 console.log(email);
                        console.log(textbody);
                        console.log(subject);
	
//	transporter.close();        
        
			
                  let tempsubject = subject.shift();
		 let mailOptions = {
		 from: '"[' +  tempsubject + '] Umniah Engineering Task Tracking System" <ett11@umniah.jo>',
            cc: email.shift().replace("<","").replace(")",""),
            subject: '['+ tempsubject +'] Task Over Due ',
            html: '<div>' + textbody.shift() + '</div>'
                    

                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
		               
 });
//transporter.close();

    }
}

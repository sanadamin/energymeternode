import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';
import passport from 'passport';
import emailcontrol1 from './middleware/emailcontrol1'
import emailcontrol from './middleware/emailcontrol'
import emailcontrol2 from './middleware/emailcontrol2'
import Owner from './model/owner'
import Division from './model/divisions'
import DivisionOwner from './model/ownerdivisions'
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
 let emailarray1 = '';
        let msgarray1 = '';
        let subjectarray1 = '';

const LocalStrategy = require('passport-local').Strategy;

let app = express();
app.server = http.createServer(app);

app.use(bodyParser.json({
    limit: config.bodyLimit
}));
app.use(passport.initialize());

let Account = require('./model/account');


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    Account.authenticate()
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//reset weekly update flag on each thursday at 23:00 
var x = schedule.scheduleJob('* 23 * * 4', function() {
    Division.find({}, (err, tasks) => {
        for(let task of tasks){
        if (err) { console.log(err) }
        if (task.weeklyupdate) {
            task.weeklyupdate = 'No'
        } else {
            task.set({ 'weeklyupdate': 'No' })
        }
        task.save((err) => {
            if (err) { console.log(err) }
        })
    }
    })
})




//send reminder on each Wednesday at 10:00
var y = schedule.scheduleJob('* 10 * * 3', function() {
    let emails = '';
    let msgarray = [];
    let emailarray = [];
    let subjectarray = [];
    Division.find({ 'weeklyupdate': 'No' }, (err, tasks) => {
    if (err) { console.log(err) }

    for (let task of tasks) {

        DivisionOwner.find({ name: task.taskownmer }, (err, owners) => {

            if (err) { console.log(err) }
            for (let owner of owners) {
                emails = '';

                for (let emp of owner.group) {
                    emails = emails + emp.email + ',';
                }
               
              emailarray.push(emails);
	      msgarray.push( 'Reminder of ' + task.taskname + ' that has not been updated yet, appreciate to update on Thursday before 2:00pm');
              subjectarray.push('Reminder');


                
            }
        })
    }
emailcontrol2.sendEmail(emailarray, msgarray,subjectarray);

})
})




function sanad1(callback) {
    emailarray1 = '';
    msgarray1 = '';
    subjectarray1 = '';
    Division.find({}, (err, tasks) => {
	if(err){console.log(err)}
	try{
        let date = new Date();
        let emails = '';
	let mylength = 0;
 	let temptasks = tasks;
        mylength = tasks.length;
	console.log(tasks);
	
        for (let i of tasks) {
		
            let ddate = new Date(i.duedate);
            let days = Math.ceil((date.getTime() - ddate.getTime()) / (1000 * 3600 * 24));
	    mylength --;
	    console.log('my length :' +mylength);
	  //  temptasks.shift();
	    	    
           if (days > 0) {
                DivisionOwner.findOne({ 'name': i.taskownmer }, (err, divowner) => {
                    if (err) {console.log('err') }
                    let lastupdate = '';
                     for (let ent of i.effectedentities) {
                         lastupdate = lastupdate + '<tr><td> Entity Name </td><td>' + ent.entityname + '</td></tr><tr><td>Entity Update</td><td>' + ent.entityupdate + '</td></tr>'
                     }
                   let taskbody = '<tr><td>' + i.taskname + '</td><td>' + i.taskownmer + '</td><td>' + Math.abs(Math.ceil((date.getTime() - ddate.getTime()) / (1000 * 3600 * 24))) + ' Days' + '</td></tr>';
                    msgarray1 = msgarray1 + taskbody;
                    
		  
                  if (mylength === 0) {
                        Owner.find({}, (err, owners) => {
                           if(err){console.log(err)}
				 emails = '';
                            for (let email of owners) {
                                emails = emails + email.email + ',';
                            }
      				 msgarray1 = '<div><table border=1><tr style="background-color: #D9e838"><th>Task Name</th><th>Task owner</th><th>Delay Amount</th></tr>' + msgarray1;
                            emailarray1 = emails;
                            callback();
                        });
                    }
                });
}
                subjectarray1 = 'OverDue Sumary';








        }
}
catch(error){
console.error(error);
}

        msgarray1 = '<div><table border=1><tr style="background-color: #D9e838"><th>Task Name</th><th>Task owner</th><th>Delay Amount</th></tr>' + msgarray1;
        // emailcontrol2.sendEmail([emailarray1], [msgarray1], [subjectarray1]);
    })
}


//var j = schedule.scheduleJob('00 15 * * *', function(){
         
//sanad1((err) => {
  //  if (err) { console.log(err) }
    // console.log('now'); 
//   emailcontrol2.sendEmail([emailarray1],[msgarray1],[subjectarray1]);
//});


//emailcontrol2.sendEmail(['s.amin@umniah.com;sanad.amin@gmail.com'], ['test'], ['testing']);

        

//});
// var interval = setInterval(function(str1, str2) {
//     console.log(str1 + " " + str2);
// }, 1000, "Hello", "How are you!");
// api routes v1


app.server.listen(config.port);

app.use('/apitask/v1', routes);

console.log(`Started on port ${app.server.address().port}`);


export default app;

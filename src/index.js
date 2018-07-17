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

let Account = require('./model/energy');





//reset weekly update flag on each thursday at 23:00 



app.server.listen(config.port);

app.use('/apitask1/v1', routes);

console.log(`Started on port ${app.server.address().port}`);


export default app;
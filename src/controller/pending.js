import mongoose from 'mongoose';
import { Router } from 'express';
import TaskName from '../model/divisions';
import Sites from '../model/sites';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Emplo from '../model/divisions'
import MyTask from '../model/divisions';
import Division from '../model/ownerdivisions'
import Owner from '../model/owner'
import TaskRecord from '../model/divisionsrecord'
import Pending from '../model/pending'
import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';
var nodemailer = require('nodemailer');

export default ({ config, db }) => {
    let api = Router();

    api.get('/', (req, res) => {
        Pending.find({}, (err, sites) => {
            if (err) {
                res.send(err);
            }
            res.json(sites);
        });
    });
    api.post('/addpending', (req, res) => {
        let date = new Date();


        MyTask.findById(req.body.taskid, (err, task) => {
            let pendingid1 = '';
            console.log(task);
            for (let item of task.pending) {
                pendingid1 = item._id;
                console.log(item.pendingon + '###' + req.body.pendingon);
                console.log(item.subtask + '$$$' + req.body.taskdescription);
                if ((item.pendingon == req.body.pendingon) && (item.subtask == req.body.taskdescription)) {
                    let pending = new Pending();
                    pending.pendingon = req.body.pendingon;
                    pending.taskid = req.body.taskid;
                    pending.pendingid = pendingid1;
                    pending.startdate = date.getFullYear() + '-' + (Number(date.getMonth()) + Number(1)) + '-' + date.getDate();
                    pending.taskdescription = req.body.taskdescription;
                    pending.status = 'Open';
                    let emails = '';
                    pending.feedback = req.body.feedback;
                    pending.save((err) => {
                        if (err) { res.send(err) };
                        Division.findOne({ "name": req.body.pendingon }, (err, div) => {

                            if (err) { res.send(err) };
                            for (let i of div.group) {
                                emails = emails + i.email + ',';
                            }
                            console.log(emails);

                            let transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'engtasktracker@gmail.com',
                                    pass: 'Umniah@123',
                                },
                            });

                            let mailOptions = {
                                from: '"[New Task] Umniah Engineering Task Tracking System" <engtasktracker@gmail.com>',

                                cc:  emails ,
                                subject: '[Delegated Task] New Task Of ' + req.body.taskdescription,
                                html: '<div>A new Task has been Delegated please follow the below link: <a href="http://212.118.13.26/tasktracker/pendingtasks">' + req.body.taskdescription + ' </a>  </div>'
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message %s sent: %s', info.messageId, info.response);
                            });
                        })
                        res.send('pending');
                    })
                };

            }


        });

    })
    api.get(('/find/:id'), (req, res) => {
        Pending.findById(req.params.id, (err, task) => {
            if (err) {
                res.send(err);
            }
            console.log(task);
            res.send(task);
        })
    });
    api.get('/returndiv/:div', (req, res) => {
        Pending.find({ "pendingon": req.params.div }, (err, pend) => {
            if (err) { res.send(err) }
            res.send(pend);
        })
    })
    api.get('/delete/:id', (req, res) => {
        Pending.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.send(err);
            }
            res.status(200).send('deleted');
        });
    });
    return api;
}

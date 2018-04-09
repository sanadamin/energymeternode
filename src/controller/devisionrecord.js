import mongoose from 'mongoose';
import { Router } from 'express';
import TaskName from '../model/divisionsrecord';
import Sites from '../model/sites';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Emplo from '../model/divisionsrecord'
import Division from '../model/ownerdivisions'
import Owner from '../model/owner'
import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';
var nodemailer = require('nodemailer');

export default ({ config, db }) => {
    let api = Router();

    api.get('/', (req, res) => {
        TaskName.find({}, (err, sites) => {
            if (err) {
                res.send(err);
            }
            res.json(sites);
        });
    });
    api.put('/update', (req, res) => {
        TaskName.findById(req.body.id, (err, task) => {
            if (err) {
                res.send(err);
            }
            if (task.actualbudget) {
                task.actualbudget = "100000";
            } else {
                task.set({ 'actualbudget': '100000' });
            }
            task.save((err) => {
                if (err) {
                    res.send(err);
                }
                res.send('Updated');
            })
        })
    });

    api.post('/add', (req, res) => {
        let taskname = new TaskName();
        var date = new Date();
        taskname.taskname = req.body.taskname;
        taskname.description = req.body.description;;
        taskname.taskownmer = req.body.taskownmer;
        taskname.tasktype = req.body.tasktype;
        taskname.project = req.body.project;
        taskname.thirdparties = req.body.thirdparties;
        taskname.duedate = req.body.duedate;
        taskname.taskdate = date.getFullYear() + '-' + (Number(date.getMonth()) + Number(1)) + '-' + date.getDate()
        taskname.relatedpr.prnumber = '';
        taskname.relatedpr.prstatus = '';
        taskname.relatedpo.ponumber = '';
        taskname.relatedpo.postatus = '';
        taskname.budgetline = req.body.budgetline;
        taskname.budgetamount = req.body.budgetamount
        taskname.actualbudget = req.body.actualbudget;
        taskname.progress = '0';
        for (let i of req.body.entities) {
            taskname.effectedentities.push({ entityname: i['entityname'], entityupdate: i['entityupdate'] });
        }
        taskname.save((err) => {
            if (err) {
                res.send(err);
            } else {
                Division.findOne({ 'name': req.body.taskownmer }, (err, div) => {
                    Owner.find({ 'auth': 'Admin' }, (err, owners) => {
                        let emails = '';
                        if (err) { res.send(err) }
                        for (let i of div.group) {
                            emails = emails + i.email + ',';
                        }
                        for (let i of owners) {
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

                            cc: '\'' + emails + '\'',
                            subject: '[Open] New Task Of ' + req.body.taskname,
                            html: '<div>Test </div>'
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message %s sent: %s', info.messageId, info.response);
                        });
                    })
                })
                res.status(200).send('Added');
            }
        })

    });

    api.get('/delete/:id', (req, res) => {
        TaskName.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.send(err);
            }
            res.status(200).send('deleted');
        });
    });

    api.get(('/find/:id'), (req, res) => {
        TaskName.findById(req.params.id, (err, task) => {
            if (err) {
                res.send(err);
            }
            res.send(task);
        })
    });
    api.put('/addentity', (req, res) => {
        TaskName.findById(req.body.taskid, (err, task) => {
            var date = new Date();
            task.effectedentities.push({
                entityname: req.body.entityname,
                entityupdate: req.body.entityupdate,
                dateofupdate: date.getFullYear() + '-' + (Number(date.getMonth()) + Number(1)) + '-' + date.getDate(),
                updater: req.body.updater
            });
            task.save((err) => {
                if (err) {
                    res.send(err);
                }
                res.send('Entity Updated');
            })

        });

    });
    api.put('/updatetask', (req, res) => {
        TaskName.findById(req.body.taskid, (err, task) => {
            console.log(task.taskname);
            if (err) { res.send(err) };
            var date = new Date();
            if (task.progress) {
                task.progress = req.body.progress;
            } else {}
            task.duedate = req.body.duedate;
            task.relatedpr.prnumber = req.body.prnumber;
            task.relatedpr.prstatus = req.body.prstatus;
            task.relatedpo.ponumber = req.body.ponumber;
            task.relatedpo.postatus = req.body.postatus; // task.updates.push({ value: req.body.update, dateofupdate: date.getFullYear() + '-' + (Number(date.getMonth()) + Number(1)) + '-' + date.getDate(), updater: req.body.name })
            let j = 0;
            for (let i of task.effectedentities) {
                i.entityupdate = req.body.update[j]['entityupdate'];
                i.dateofupdate = date.getFullYear() + '-' + (Number(date.getMonth()) + Number(1)) + '-' + date.getDate();
                if (i.updater) {
                    i.updater = req.body.update[j]['updater'];
                } else {
                    i.set({ 'updater': req.body.update[j]['updater'] })
                }

                j++;
            }
            task.save((err) => {
                if (err) { res.send(err) }
                res.send('updated');
            })
        })
    })
    api.put('/updatehistory', (req, res) => {
        TaskName.findById(req.body.id, (err, task) => {
            let j = 0;
            var date = new Date();
            for (let i of req.body.history) {
                task.entitieshistory.push({
                    entityname: i['entityname'],
                    entityupdate: i['entityupdate'],
                    dateofupdate: task.effectedentities[j].dateofupdate,
                    updater: task.effectedentities[j].updater
                })
                j++
            }
            task.save((err) => {
                if (err) { res.send(err) }
                res.send('Done');
            })
        })
    })
    api.get('/findempdiv/:name', (req, res) => {
        Division.find({ 'group.employee': req.params.name }, (err, div) => {
            if (err) { res.send(err) }
            res.json(div);
        })
    });
    api.get('/findtaskbydiv/:name', (req, res) => {
        TaskName.find({ 'taskownmer': req.params.name }, (err, div) => {
            if (err) { res.send(err) }
            res.json(div);
        })
    });
    api.get('/history/:query/:id', (req, res) => {
        TaskName.findOne({ '_id': req.params.id, 'entitieshistory.entityname': req.params.query }, (err, task) => {
            if (err) { res.send(err) }


            res.json(task);

        })
    });


    return api;
}
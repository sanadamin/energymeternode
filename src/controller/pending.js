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
                    pending.feedback = req.body.feedback;
                    pending.save((err) => {
                        if (err) { res.send(err) }
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
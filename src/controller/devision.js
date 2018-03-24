import mongoose from 'mongoose';
import { Router } from 'express';
import TaskName from '../model/divisions';
import Sites from '../model/sites';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Emplo from '../model/divisions'

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

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
        taskname.taskdate = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDay();
        taskname.relatedpr = req.body.relatedpr;
        taskname.relatedpo = req.body.relatedpo;
        taskname.budgetline = req.body.budgetline;
        taskname.budgetamount = req.body.budgetamount
        taskname.actualbudget = req.body.actualbudget;
        taskname.progress = '0';


        taskname.save((err) => {
            if (err) {
                res.send(err);
            } else {
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

    api.put('/updatetask', (req, res) => {
        TaskName.findById(req.body.taskid, (err, task) => {
            if (err) { res.send(err) };
            var date = new Date();
            task.progress = req.body.progress;
            task.duedate = req.body.duedate;
            task.relatedpr = req.body.relatedpr;
            task.relatedpo = req.body.relatedpo;
            task.updates.push({ value: req.body.update, dateofupdate: date.getFullYear() + '-' + (Number(date.getMonth()) + Number(1)) + '-' + date.getDate(), updater: req.body.name })
            task.save((err) => {
                if (err) { res.send(err) }
                res.send('updated');
            })
        })
    })
    return api;
}
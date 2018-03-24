import mongoose from 'mongoose';
import { Router } from 'express';
import TaskName from '../model/owner';
import Sites from '../model/sites';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Emplo from '../model/owner'

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
    api.put('/empdata', (req, res) => {
        TaskName.findOne({ username: req.body.username }, (err, emp) => {
            if (err) {
                res.send(err);
            }
            res.json({ name: emp.name, auth: emp.auth });
        });

    });
    api.post('/auth', (req, res) => {
        TaskName.findOne({ username: req.body.username }, (err, owner) => {
            if (err) {
                res.send(err);
            }
            if (owner.password === req.body.password) {
                res.json({ auth: "Approved", level: owner.auth, name: owner.name });
            } else {
                res.json({ auth: "Rejected", level: "None" });
            }

        });

    });

    api.post('/add', (req, res) => {
        let taskname = new TaskName();
        taskname.name = req.body.name;
        taskname.username = req.body.username;
        taskname.password = req.body.password;
        taskname.email = req.body.email;
        taskname.auth = req.body.auth;
        taskname.fcmtoken = "";


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


    return api;
}
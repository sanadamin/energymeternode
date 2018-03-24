import mongoose from 'mongoose';
import { Router } from 'express';
import TaskName from '../model/taskname';
import Sites from '../model/sites';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Emplo from '../model/Employee'

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

    api.post('add', (req, res) => {
        let taskname = new TaskName();
        taskname.taskname = req.body.taskname;
        taskname.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).send('Added');
            }
        })
    });

    api.get('/delete/:id', (req, res) => {
        Task.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.send(err);
            }
            res.status(200).send('deleted');
        });
    });


    return api;
}
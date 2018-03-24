import mongoose from 'mongoose';
import { Router } from 'express';
import TaskName from '../model/ownerdivisions';
import Sites from '../model/sites';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Emplo from '../model/ownerdivisions'
import Owner from '../model/owner'
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

    api.post('/add', (req, res) => {
        let taskname = new TaskName();
        taskname.name = "Power Planning";


        taskname.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).send('Added');
            }
        })
    });
    api.put('/updateemp', (req, res) => {

        TaskName.findOne({ name: req.body.name }, (err, division) => {
            if (err) {
                res.send(err);
            }
            Owner.findOne({ name: req.body.empname }, (err, owner) => {
                if (err) {
                    res.send(err);
                }
                division.group.push({ employee: req.body.empname, email: owner.email });
                division.save((err) => {
                    if (err) {
                        res.send(err);
                    }
                    res.send('Done');
                })
            })

        });
    });


    api.post('/adddiv', (req, res) => {
        let taskname = new TaskName();
        taskname.name = req.body.name;

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
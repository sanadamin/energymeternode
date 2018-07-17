import mongoose from 'mongoose';
import { Router } from 'express';
import Energy from '../model/energy';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, db }) => {
    let api = Router();

    // '/v1/account/getall' ** REMOVE AFTER DEV
    api.get('/', (req, res) => {
        Energy.find({}, (err, accounts) => {
            if (err) {
                send(err);
            }
            res.json(accounts);
        });
    });

    api.put('/add', (req, res) => {
        let energy1 = new Energy();
        energy1.energy.reading = req.body.energyreading;
        energy1.voltage.reading = req.body.voltagereading;
        energy1.energy.timestamp = req.body.energytimestamp;
        energy1.voltage.timestamp = req.body.voltagetimestamp;

        energy1.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'energy has been saved successfully' });
            }
        });
    });

    api.get('/delete/:id', (req, res) => {
        Energy.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.send(err);
            }
            res.status(200).send('deleted');
        });
    });


    return api;
}
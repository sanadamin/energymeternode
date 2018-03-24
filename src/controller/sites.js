import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, db }) => {
    let api = Router();
    api.get('/', (req, res) => {
        Site.find({}, (err, sites) => {
            if (err) {
                res.send(err);
            }
            res.json(sites);
        });
    });

    api.get('/delete/:id', (req, res) => {
        Site.findByIdAndRemove(req.params.id, (err, res) => {
            if (err) {
                res.send(err);

            }

        });
        res.send('deleted');
    });

    api.get('/findsitename1/:id', (req, res) => {


        Site.find({ 'sitename': new RegExp(req.params.id, 'i') }, (err, sites) => {
            if (err) {
                res.send(err);
            }
            res.json(sites);
        });
    });
    api.get('/find', (req, res) => {
        var nameRegex = new RegExp(req.query.input);
        Site.find({ 'sitename': new RegExp('bayader', 'i') }, (err, sites) => {
            if (err) {
                res.send(err);
            }
            res.json(sites);
        });
    });

    api.post('/add', (req, res) => {
        let site = new Site();
        site.sitename = req.body.sitename;
        site.coordinates.lat = req.body.lat;
        site.coordinates.long = req.body.long;
        site.siteid = req.body.siteid;
        site.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'site has been saved successfully' });
        });
    });

    api.put('/updatesiteinfo', (req, res) => {
        Site.findOne({ sitename: req.body.sitename }, (err, site) => {
            if (err) {
                res.send(err);
            }

            site.siteload = req.body.dcload;
            site.maincbraiting = req.body.phases;
            site.rectifiertype = req.body.rectifier;
            site.generatorcapacity = req.body.rectifierqty;
            site.accapacity = req.body.ac;
            site.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Site Info Updated" });
            });
        });
    });


    return api;
}
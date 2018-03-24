import  mongoose from 'mongoose';
import { Router } from 'express';
import Task from '../model/task';
import Sites from '../model/sites';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Emplo from '../model/Employee'

var FCM = require('fcm-node');
 var serverKey = require('../firecm/umniah-9c3a1-firebase-adminsdk-x0wjp-b99ddc3da6.json') //put your server key here
 var fcm = new FCM(serverKey);
import {generateAccessToken, respond, authenticate} from '../middleware/authMiddleware';

export default ({ config, db }) => {
  let api = Router();

api.get('/findmytasks/:name',(req,res)=>{
  Emp.findOne({'empusername':req.params},(err,emp)=>{
    if(err){
      res.send(err);
    }
    Tasks.find({'taskassignedto':emp.empname},(err,tasks)=>{
  if(err){
    res.send(err);
  }
      res.json(tasks);
    });
  });

});


  api.get('/', (req, res) => {

    Task.find({}, (err, sites) => {
      if (err) {
        res.send(err);
      }
      res.json(sites);
    });
  });

api.get('/delete/:id',(req,res)=>{
  Task.findByIdAndRemove(req.params.id,(err)=>{
    if(err){
      res.send(err);
    }
    res.status(200).send('deleted');
  });
});
  api.post('/add', (req, res) => {
    let task = new Task();
    var date = new Date();
    var lat = '';
    var long = '';
    var tok = '';
    var taskname='';
    var taskbody ='';
    Emplo.findOne({'empname':req.body.taskassignedto},(err,empl) =>{
      if(err){
        res.send(err);
      }
      tok = empl.empregtoken;

      Sites.findOne({'sitename':req.body.sitename},(err,sitee)=>{
        if(err){
          res.send(err);
        }


        lat = sitee.coordinates.lat;
        long = sitee.coordinates.long;
        task.tasklat = lat;
        task.tasklong = long;
        task.taskstarttime =  date.getHours()+9 + ':' +date.getMinutes();
        task.taskdate = date.getFullYear() + '/' + Number(date.getMonth()) +1 + '/'+ date.getDay();
        task.sitename = req.body.sitename;
        task.taskname = req.body.taskname;
        task.taskcat = req.body.taskcat;
        task.taskassignedto = req.body.taskassignedto;
        task.save(function(err) {
          if (err) {
            res.send(err);
          }
          var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
              to: tok,
              notification: {
                  title: 'New Task In: ' + req.body.sitename,
                  body: req.body.taskname,
                  sound: 'alert'
              }


          };
          fcm.send(message, function(err, response){
              if (err) {
                  res.send(err);
              }
          });
          // res.json({ message:req.body.taskname + 'Employee has been saved successfully' });
          res.status(201).send('OK');

        });
      });
    });





  });




  return api;
}

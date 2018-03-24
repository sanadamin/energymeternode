import  mongoose from 'mongoose';
import { Router } from 'express';
import Task from '../model/task';
import TaskApproval from '../model/taskapproval'
import Sites from '../model/sites';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Emplo from '../model/Employee'
import Record from '../model/record'


import {generateAccessToken, respond, authenticate} from '../middleware/authMiddleware';

export default ({ config, db }) => {
  let api = Router();



  api.get('/', (req, res) => {

    TaskApproval.find({}, (err, tasks) => {
      if (err) {
        res.send(err);
      }
      res.json(tasks);
    });
  });

//   api.put('/updateaction', (req, res) => {
//     var date = new Date();
//     TaskApproval.findById(req.body.id, (err, task) => {
//       if (err) {
//         res.send(err);
//       }
//       task.description = req.body.description;
//       task.save(function(err){
//         if(err){
//           res.send(err);
//         }
//
//           let record = new Record();
//           record.sitename = task.sitename;
//           record.taskname = task.taskname
//           record.taskcat = task.taskcat;
//           record.taskassignedto = task.taskassignedto;
//           record.taskdate = task.taskdate;
//           record.taskstarttime = task.taskstarttime;
//           record.acknowledgetime = task.acknowledgetime;
//           record.description = req.body.description;
//           record.closingtime = task.closingtime;
//           record.approvedby = req.body.username;
//           record.approvedtime = date.getMonth() + ':' +date.getMinutes();
//           record.save(function(err){
// if(err){
//   res.send(err);
// }
// TaskApproval.findByIdAndRemove(req.body.id,function(err){
//   if(err){
//     res.send(err);
//   }
//   res.status(201).send('OK');
// })
//
//           });
//       })
//
//       });
//
//   });
  api.post('/add', (req, res) => {
    let task = new Task();
    var date = new Date();
    var lat = '';
    var long = '';
    var tok = '';
    var taskname='';
    var taskbody ='';
    Task.findById(req.body.id,(err,task) =>{
      if(err){
        res.send(err);
      }

      TaskA.sitename = task.sitename;
      taskapproval.taskname = task.taskname;
      taskapproval.taskcat = task.taskcat;
      taskapproval.taskassignedto = task.taskassignedto;
      TaskApproval.taskdate = task.taskdate;
      taskapproval.taskstarttime = task.taskstarttime;
      taskapproval.acknowledgetime = task.acknowledge;
      taskapproval.description = req.body.description;
      taskapproval.ch
      taskapproval.closingtime = date.getHours() + ':' + date.getMinutes();


        taskapproval.save(function(err) {
          if (err) {
            res.send(err);
          }
          // res.json({ message:req.body.taskname + 'Employee has been saved successfully' });
          res.status(201).send('OK');

        });

    });





  });

  return api;
}

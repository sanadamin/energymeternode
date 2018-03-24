import  mongoose from 'mongoose';
import { Router } from 'express';
import Emp from '../model/Employee';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';



import {generateAccessToken, respond, authenticate} from '../middleware/authMiddleware';

export default ({ config, db }) => {
  let api = Router();




  api.get('/', (req, res) => {
    Emp.find({}, (err, sites) => {
      if (err) {
        res.send(err);
      }
      res.json(sites);
    });
  });

  api.post('/authemp/:id', (req, res) => {
    Emp.findOne({'empusername':req.params.id}, (err, emp) => {
      if (err) {
        res.send(err);
      }
      if(emp.emppassword === req.body.password){
        res.status(200).send('pass');
      }else if (emp.emppassword != req.body.password) {
        res.status(201).send('reject');
      }
    });
  });



  api.get('/findempname/:id', (req, res) => {


    Emp.find({'empusername': new RegExp(req.params.id,'i')}, (err, sites) => {
      if (err) {
        res.send(err);
      }
      res.json(sites);
    });
  });



  api.put('/updateemp/:name', (req, res) => {
    Emp.findById(req.params.name, (err, employee) => {
      if (err) {
        res.send(err);
      }

      employee.emplat = req.body.emplat;
      employee.emplong = req.body.emplong;
      employee.save(function(err){
        if(err){
          res.send(err);
        }
          res.json(employee.emplat);
      })

      });



  });
api.get('/delete/:name',(req,res)=>{
  var id ='';
Emp.findOne({'empusername':req.params.name},(err,empl)=>{
  if(err){
    res.send(err);
  }
  id = empl._id;
  Emp.findByIdAndRemove(id,(err)=>{

    if(err){
      res.send(err);
    }
    res.send('deleted');
  });
});



});
  api.put('/updateemptoken', (req, res) => {
    Emp.findOne({'empusername':req.body.empregtoken}, (err, employee) => {
      if (err) {
        res.send(err);
      }
      employee.empregtoken = req.body.empregtoken;
      employee.save(function(err){
        if(err){
          res.send(err);
        }
          res.json({message:'Updated Token'});
      })

      });

  });

  api.post('/add', (req, res) => {
    let emp = new Emp();


    emp.empname = req.body.empname;
    emp.empusername = req.body.empusername;
    emp.emppassword = req.body.emppassword;
    emp.emplat = '32';
    emp.emplong = '31';
    emp.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message:req.body.emplat + 'Employee has been saved successfully' });
    });
  });

  return api;
}

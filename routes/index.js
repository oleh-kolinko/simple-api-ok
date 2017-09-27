const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const User = require('../models/user.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/users', (req, res, next) => {
  User.find({}, (err,result)=>{
    if(err) return res.json(err);
    res.json(result);
  });
});

router.post('/users', (req, res, next) => {
  const newDoc = new User(req.body);
  newDoc.save( (err,result)=>{
    if(err) return res.json(err);
    res.json({message: 'User has been created successfully', id: result._id});
  });
});

router.get('/users/:id', (req, res, next) => {
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){ //check if id is valid
    res.status(400).json({ message: 'Specified id is not valid'} ) ;
  }

  User.findById(id, (err,result)=>{
    if(err) return res.json(err);
    res.json(result);
  });
});

router.put('/users/:id', (req, res, next) => {
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){ //check if id is valid
    res.status(400).json({ message: 'Specified id is not valid'} ) ;
  }

  const updatedDoc = req.body;

  User.findByIdAndUpdate(id, updatedDoc, (err,result)=>{
    if(err) return res.json(err);
    res.json( {message: 'User has been updated successfully'} );
  });
});

router.delete('/users/:id', (req, res, next) => {
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){ //check if id is valid
    res.status(400).json({ message: 'Specified id is not valid'} ) ;
  }

  User.findByIdAndRemove(id, (err,result)=>{
    if(err) return res.json(err);
    res.json({message: 'User has been deleted successfully'});
  });
});



module.exports = router;

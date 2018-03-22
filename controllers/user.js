

let dotenv = require('dotenv');
let jwt = require('jsonwebtoken');
let User = require('../models/user');
let config = require('config');
let mongoose = require('mongoose');

// exports.login = (req,res)=>{
// 	console.log(req.body);
// 	User.findOne({ phoneNumber: req.body.phoneNumber }, (err, user) => {
//      console.log('result user',user);
//       if (!user) { return res.sendStatus(403); }
     
//       user.comparePassword(req.body.password, (error, isMatch) => {
//       	console.log('isMatch',isMatch,config.SECRET_TOKEN);
//         if (!isMatch) { return res.sendStatus(403); }
//         //const token = jwt.sign({ user: user }, config.SECRET_TOKEN); // , { expiresIn: 10 } seconds
//         //console.log(token);
//         let resultData = {
//           phoneNumber :user.phoneNumber,
//           email:user.email          
//         }
//         res.status(200).json(resultData);
//       });
//     });

// }

exports.login = (req,res) =>{
  var phoneNumber = req.body.phoneNumber;
   var password = req.body.password;
  User.findOne({phoneNumber:phoneNumber,password:password},(err,user)=>{
         if(err) return next(err);
       if(!user) return res.send('Not logged in!');     
      console.log(user.role);
       res.status(200).json({status:'success',role:user.role});
  })
}


function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

 // Get all
  exports.getAll = (req, res) => {
    User.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  // Count all
  exports.count = (req, res) => {
    User.count((err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  }

  // Insert
  exports.insert = (req, res) => {
    const obj = new User(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      console.log('item',item);
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.json({'status':'success'});
    });
  }

  // Get by id
  exports.get = (req, res) => {
    console.log(req.params.id);
    User.findOne({ username: req.params.username }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

  // Update by id
  exports.update = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  // Update by id
  exports.updatePIN = (req, res) => {
    User.update({ phoneNumber: req.body.phoneNumber}, {$set:{password:req.body.mPin}}, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  // Delete by id
  exports.delete = (req, res) => {
    console.log( req.params.id );
    User.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  exports.deleteAll = (req, res) => {
  loggerinfo.info('Request body of deleteAll Service',req.body);
  User.remove({}, (err) => {
    if (err) { return loggererror.info(err); }
    loggerinfo.info('All device sucessfully deleted!');
    res.sendStatus(200);
  })
}

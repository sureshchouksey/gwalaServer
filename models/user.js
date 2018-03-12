var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var userSchema = mongoose.Schema({
  firstName:{ type: String,trim: true,require:true,default:'' },
  lastName:{ type: String,trim: true,require:true,default:'' },  	
  phoneNumber: { type: Number, unique: true, lowercase: true, trim: true },
  email:String,
  password: { type: String,trim:true},    
  flatNoBuidlingName:{ type: String,trim: true,require:true,default:'' },
  streetName:{ type: String,trim: true,require:true,default:'' },
  area:{ type: String,trim: true,require:true,default:'' },
  landmark:{ type: String,trim: true,require:true,default:'' },
  pincode:{ type: Number,trim: true,require:true},
  city:{ type: String,trim: true,require:true,default:'' },
  state:{ type: String,trim: true,require:true,default:'' } 
  
});

// Before saving the user, hash the password
// userSchema.pre('save', function(next) {
//   const user = this;
//   if (!user.isModified('password')) { return next(); }
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) { return next(err); }
//     bcrypt.hash(user.password, salt, function(error, hash) {
//       if (error) { return next(error); }
//       user.password = hash;
//       next();
//     });
//   });
// });

// userSchema.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash){
//     if (err) {
//       return next(err);
//     }    
//     user.password = hash;
//     console.log('hash',user);
//     next();
//   })
// });


// userSchema.methods.comparePassword = function(candidatePassword, callback) {
//   console.log('candidatePassword',this.password);
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     console.log('isMatch',isMatch);
//     if (err) { return callback(err); }
//     callback(null, isMatch);
//   });
// };

// userSchema.methods.authenticate = function (phoneNumber, password, callback) {
//   User.findOne({ phoneNumber: phoneNumber })
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});


module.exports = mongoose.model('User', userSchema);
var userCtrl = require('../controllers/user');
let User =  require('../models/user');

module.exports = function (app) {

  app.route('/api/login').post(userCtrl.login);
  app.route('/api/users').get(userCtrl.getAll);
  app.route('/api/updatePIN').put(userCtrl.updatePIN);
  app.route('/api/users/count').get(userCtrl.count);
  app.route('/api/user').post(userCtrl.insert);
  app.route('/api/user/:username').get(userCtrl.get);
  app.route('/api/user/:id').put(userCtrl.update);
  app.route('/api/user/:id').delete(userCtrl.delete);
  //app.route('/api/user/deleteAll').delete(userCtrl.deleteAll);

  // Apply the routes to our application with the prefix /api
  //app.use('/api', router);

}

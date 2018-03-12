var Device = require('../controllers/device');

module.exports = function (app) {
    //console.log(app);
    app.route('/device')
        .get(Device.getAll)
        .post(Device.insert)
        .put(Device.update);

    app.route('/device/:userId/:deviceId')
        .get(Device.get);

    app.route('/sendMessage')
        .post(Device.sendMessage);
    app.route('/sendForTopic')
        .post(Device.sendForTopic);
    app.route('/subscribeToTopic')
        .post(Device.subscribeToTopic);
    app.route('/unsubscribeToTopic')
        .post(Device.unsubscribeToTopic);
    app.route('/sendToDevice')
        .post(Device.sendToDevice);
    app.route('/SearchByUsers')
        .post(Device.SearchByUsers);
    app.route('/device/search')
        .post(Device.searchDevice);

    app.route('/sendNotification')
        .post(Device.sendNotification);
    app.route('/device/count')
        .get(Device.count);
     app.route('/device/:id')
         .delete(Device.delete);
    app.route('/device/deleteAll')
        .delete(Device.deleteAll);
    // app.route('/readLogFile')
    //     .get(Device.readLogFile);
    
}
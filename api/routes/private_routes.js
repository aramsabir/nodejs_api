
let middleware = require('../middleware');
var userController = require('../components/users/userController');
var roleController = require('../components/roles/roleController');
const resources = require('../components/event_and_resources/resources');

module.exports = function (app) {

    var checkExpireToken = middleware.checkToken;
    var checkAccess = middleware.checkAccess;

    app.get('/users',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.UserRead) }, checkAccess,userController.List)
       .get('/userinfo',checkExpireToken, userController.UserInformation)
       .get('/user',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.UserRead) }, checkAccess,userController.One)
       .post('/user',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.UserWrite) }, checkAccess,userController.newData)
       .put('/user',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.UserUpdate) }, checkAccess,userController.putData)
       .delete('/user',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.UserDelete) }, checkAccess,userController.Delete)

    app.get('/roles',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RoleRead) }, checkAccess,roleController.List)
       .get('/role',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RoleRead) }, checkAccess,roleController.One)
       .post('/role',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RoleWrite) }, checkAccess,roleController.New)
       .put('/role',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RoleUpdate) }, checkAccess,roleController.Put)
       .delete('/role',checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RoleDelete) }, checkAccess,roleController.Delete)



    app.get('/check', checkExpireToken, middleware.afterCheck);
    app.get('/', checkExpireToken, middleware.testToken);

  
}

function addHeader(req, res, cb, access) {
    req.query.access = access; cb()
}

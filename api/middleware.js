let jwt = require('jsonwebtoken');
const config = require('./components/auth/config.js');
const Auth = require("./components/auth/auth");
const auth = require('./components/auth/authController');
const User = require('./components/users/user');


exports.checkToken = async (req, res, next) => {

  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token)
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  if (token) {

    var user = await Auth.findOne({ token: token }).exec()
    if (!user) {
      res.json({
        status: false,
        success: false,
        message: "Token is not valid"
      });
      return 0;
    }
    var findUser = await User.findOne({ _id: user.user }).exec()
    if (findUser) {
      if (!findUser.active) {
        res.json({
          status: false,
          message: "You are banded"
        });
        return 0;
      }
    }
    else {
      res.json({
        status: false,
        message: "You are not user"
      });
      return 0;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          success: false,
          message: 'Token is not valid'
        });
        return 0;
      } else {
        req.decoded = decoded;
        next();

      }
    });
  } else {
    res.json({
      status: false,
      message: 'Auth token is not supplied'
    });
    return 0;
  }
};


exports.checkAccess = async (req, res, next) => {
  let userInfo = await auth.userInfo(req.headers);
  if (!userInfo.role_id.resource.split(",").includes(req.query.access)) {
    res.json({ status: false, message: "You are not authorized!" });
    return 0;
  } else {
    req.query.userID = userInfo._id
    req.query.userFullName = userInfo.full_name
    if (req.method == "GET") {
      if (req.query.skip == 'undefined' || !req.query.skip) req.query.skip = 0
      if (req.query.limit == 'undefined' || !req.query.limit) req.query.limit = 20
      if (req.query.sort == 'undefined' || !req.query.sort) req.query.sort = '-created_at'

      if(req.query.limit >1000){
        res.json({ status: false, message: "Page size out of limitation" });
        return 0;
      }
    }
    next();
  }
};


exports.logout = async (req, res) => {

  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token)
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }




  res.json({ success: true })
  return
}


exports.afterCheck = async (req, res) => {
  res.json({
    success: true,
    message: 'Index page'
  });
}

exports.getIterfacesIP = async (req, res) => {


  if (req.socket.localPort != 3501) {
    res.json({ status: false, message: "Access denied" })
    return
  }

  const { networkInterfaces } = require('os');

  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
}
exports.testToken = async (req, res) => {


  let userInfo = await auth.userInfo(req.headers);

  if (userInfo) {
    res.json({
      status: true,
      success: true,
      message: "Authenticated successfully"
    });
    return 0;

  } else {
    res.json({
      status: false,
      success: false,
      message: "Token is not valid"
    });
    return 0;
  }


}


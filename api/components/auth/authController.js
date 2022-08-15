var User = require("../users/user");
var Auth = require("./auth");
let jwt = require("jsonwebtoken");
let config = require("./config");


exports.login = async (req, res) => {
  let username = req.body.email;
  let password = req.body.password;

  if (!req.body.email) {
    res.json({
      success: false,
      message: "Authentication failed! Please check user or password",
    });
    return 0;
  }
  if (!req.body.password) {
    res.json({
      success: false,
      message: "Authentication failed! Please check user or password",
    });
    return 0;
  }

  await User.findOne({ $and: [{ $or: [{ email: req.body.email }, { user_name: req.body.email }] }, { deleted_at: null }] }).exec(function (err, user) {
    if (user) {
      if (user.validPassword(req.body.password)) {
        if (user.active) {
          var auth = new Auth();
          auth.user = user._id;
          auth.agent = auth.generateHash(req.useragent.source);
          Auth.findOne({ user: auth.user, agent: auth.agent }, function (
            err,
            row
          ) {
            let token = jwt.sign({ username: username,_id:user._id }, config.secret, {
              expiresIn: "300h", // expires in 24 hours,
            });
            if (row) {
              row.token = token;
              row.save(function (err) {
                if (err) throw err;
                res.json({
                  success: true,
                  message: "Login to the system successfully",
                  token: token,
                  email: user.email,
                  type: user.type,
                  B_token: auth.token,
                  name: user.full_name,
                });
                return 0;
              });
            } else {
              auth.token = token;
              auth.save(function (err) {
                if (err) throw err;
                res.json({
                  success: true,
                  message: "Login to the system successfully",
                  token: token,
                  email: user.email,
                  type: user.type,
                  B_token: auth.token,
                  name: user.name,
                  role: user.role,
                });
                return 0;
              });
            }
          });
        } else {
          res.json({
            success: false,
            message: "User is not active please call administrator",
          });
          return 0;
        }
      } else {
        res.json({
          success: false,
          message: "Incorrect email or password",
        });
        return 0;
      }
    } else {
      res.json({
        success: false,
        message: "Incorrect email or password",
      });
      return 0;
    }
  });
};

exports.findByToken = function (token, req, cb) {
  let auth = new Auth();
  let agent = auth.generateHash(req.useragent.source);

  // console.log('Time2:',  auth.generateHash(req.useragent.source));

  Auth.findOne({ token: token, agent: agent }, function (err, row) {
    if (row) return cb(null, row);
    return cb(null, null);
  });
};

exports.userInfo = async (headers) => {
  if (!headers.authorization) {
    return { role_id: { resource: "" } };
  } else {
    let token = headers.authorization.substr(7);
    let auth = new Auth();
    let agent = auth.generateHash(headers["user-agent"]);

    let userID = await Auth.findOne({ token: token, agent: agent })
      .select({ user: 1, _id: 0 })
      .exec();
    try {
      let userInfo = await User.findById(userID.user)
        .populate("role_id")
        .select({ password: 0 })
        .exec();
      return userInfo;
    } catch (error) { }
  }
};

exports.checkAcces =  {

  Authentication:async function(role,req,res, callback) {
    let err;
    let player;
    
    if (!req.headers.authorization) {
      return { role_id: { resource: "" } };
    } else {
      let token = req.headers.authorization.substr(7);
      let auth = new Auth();
      let agent = auth.generateHash(req.headers["user-agent"]);
  
      let userID = await Auth.findOne({ token: token, agent: agent })
        .select({ user: 1, _id: 0 })
        .exec();
      try {
        let userInfo = await User.findById(userID.user)
          .populate("role_id")
          .select({ password: 0 })
          .exec();
          if (!userInfo.role_id.resource.split(",").includes(role)) {
            res.json({
              status: false,
              success: false, 
              message: "You are not authorized!"
            });
            return 0;
          } 
           
           return callback(err, true);
        
      } catch (error) { }
    }


    return callback(null, player);
}


  }
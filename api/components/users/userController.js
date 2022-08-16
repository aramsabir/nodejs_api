const User = require("./user");
const authController = require("../auth/authController");


exports.newData = async (req, res) => {
  var newData = new User(req.body);
  var validate = await newData.validation(req.body, 'create')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
  }

  newData.creator = req.query.userID;
  newData.password = newData.generateHash(req.body.password);
  newData.created_at = Date.now();
  newData.updated_at = Date.now();
  newData.save(function (err, res) {
    if (err) throw err;
    else {
      res.json({ status: true, message: "User has been created" });
      return 0;
    }
  });
};


exports.List = async (req, res) => {


  var search = {}
  if (req.query.search && req.query.search != undefined && req.query.search != 'undefined') {
    search = {
      $or: [
        { full_name: new RegExp('^' + req.query.search, "i") },
        { user_name: new RegExp('^' + req.query.search, "i") },
        { phone: new RegExp('^' + req.query.search, "i") },
      ]
    }
  }


  var users = await User.find({ $and: [{ deleted_at: null }, search] })
    .populate('creator')
    .populate('role_id')
    .select({ password: 0 })
    .skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))
    .sort(req.query.sort)
    .exec();

  var count = await User.countDocuments({ $and: [{ deleted_at: null }, search] })
    .exec();

  if (users.length == 0) {
    res.json({ status: false, message: "users not found" });
    return 0;
  } else {
    res.json({ status: true, count, data: users, message: "list users" });
    return 0;
  }
}

exports.One = async (req, res) => {

  var newData = new User(req.query);
  var validate = await newData.validation(req.body, 'find')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
  }

  var user = await User.findOne({ $and: [{ deleted_at: null }, { _id: req.query._id }] })
    .select({ password: 0 })
    .exec();
  if (!user) {
    res.json({ status: false, message: "User not found" });
    return 0;
  } else {
    res.json({ status: true, data: user, message: "Single user" });
    return 0;
  }
}

exports.UserInformation = async (req, res) => {

  var userInfo  = await authController.userInfo(req.headers)
  if (!userInfo) {
    res.json({ status: false, message: "User not found" });
    return 0;
  } else {
    res.json({ status: true, data: userInfo, message: "Single user" });
    return 0;
  }
}

exports.Delete = async (req, res) => {

  var newData = new User(req.query);
  var validate = await newData.validation(req.body, 'delete')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
  }

  var user = await User.findOneAndUpdate({ $and: [{ deleted_at: null }, { _id: req.query._id }] }, { $set: { deleted_at: Date.now(), editor: req.query.userID } })
    .exec();
  if (!user) {
    res.json({ status: false, message: "User has not been updated, user not found" });
    return 0;
  } else {
    res.json({ status: true, message: "User has been deleted" });
    return 0;
  }
}

exports.putData = async (req, res) => {
  var newData = new User(req.body);
  var validate = await newData.validation(req.body, 'edit')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
  }

  await User.findOne(
    { _id: req.body._id },
  ).exec(function (e, r) {
    if (e) throw e;
    if (r) {
      r.set(req.body)
      if (req.body.password)
        r.password = newData.generateHash(req.body.password);
      else
        delete req.body.password
      r.editor = req.query.userID
      r.updated_at = Date.now();
      r.save(function (err, res) {
        if (err) throw err;
        else {
          res.json({ status: true, message: "User has been updated" });
          return 0;
        }
      });
    }
  })

};

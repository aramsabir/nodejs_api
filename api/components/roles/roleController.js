const Role = require("./roles");



exports.New = async (req, res) => {
  var newData = new Role(req.body);
  var validate = await newData.validation(req.body, 'create')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
 }
  newData.creator = req.query.userID;
  newData.created_at = Date.now();
  newData.updated_at = Date.now();
  newData.save(function (err, res) {
    if (err) throw err;
    else {
      res.json({ status: true, message: "Role has been created" });
      return 0;
    }
  });
};

exports.List = async (req, res) => {

  var search = {}
  if (req.query.search && req.query.search != undefined && req.query.search != 'undefined') {
    search = {
      $or: [
        { name: new RegExp('^' + req.query.search, "i") },
        { description: new RegExp('^' + req.query.search, "i") },
      ]
    }
  }


  var roles = await Role.find({ $and: [{ deleted_at: null }, ] })
    .populate('creator')
    .skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))
    .sort(req.query.sort)
    .exec();

  var count = await Role.countDocuments({ $and: [{ deleted_at: null }, search] })
    .exec();

  if (roles.length == 0) {
    res.json({ status: false, message: "Roles not found" });
    return 0;
  } else {
    res.json({ status: true, count, data: roles, message: "list role" });
    return 0;
  }
};

exports.One = async (req, res) => {
  if (!req.query._id) {
    res.json({ status: false, message: "Role ID required" });
    return 0;
  }
  var _id = req.query._id;

  var role = await Role.findOne({ $and: [{ deleted_at: null }, { _id: _id }] })
    .exec();
  if (!role) {
    res.json({ status: false, message: "Role not found" });
    return 0;
  } else {
    res.json({ status: true, data: role, message: " role" });
    return 0;
  }
};

exports.Put = async (req, res) => {
  
  var newData = new Role(req.body);

  var validate = await newData.validation(req.body, 'edit')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
 }

  await Role.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        editor: req.query.userID,
        name: req.body.name,
        description: req.body.description,
        resource: req.body.resource,
        updated_at: Date.now(),
      },
    }
  ).exec(function (e, r) {
    if (e) throw e;
    if (r) {
      res.json({ status: true, message: "Role has been updated" });
      return 0;
    } else {
      res.json({ status: false, message: "Role not found" });
      return 0;
    }
  });
};

exports.Delete = async (req, res) => {

  var newData = new Role(req.query);
  var validate = await newData.validation(req.body, 'delete')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
  }

  var role = await Role.findOneAndUpdate({ $and: [{ deleted_at: null }, { _id: req.query._id }] },{$set:{deleted_at:Date.now(),editor:req.query.userID}})
    .exec();
  if (!role) {
    res.json({ status: false, message: "Role has not been updated, role not found" });
    return 0;
  } else {
    res.json({ status: true, message: "Role has been deleted" });
    return 0;
  }
}
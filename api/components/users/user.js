var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
mongoose.Promise = global.Promise;
var schema = mongoose.Schema({
  full_name: {
    type: String,
    trim: true,
  },
  user_name: {
    type: String,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: "unnkown@example.com",
  },
  password: { type: String },
  card_no: { type: String },
  phone: { type: String },
  job_title: { type: String },
  profile_photo: {
    type: String,
    default: "avatar.png",
  },
  role_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Role",
    default: null,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  editor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
    default: null
  },
  active: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpires: {
    type: Date,
    default: "",
  },
});



function validEmail(email) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}

// generating a hash
schema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
schema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


schema.methods.validation = async function (body, key) {

  switch (key) {
    case 'create':
      if (!body.full_name || body.full_name == '') {
        return ({ status: false, message: 'Full name required or not valid' });
      }
      if (body.full_name.length < 5 || body.full_name.length > 40) {
        return ({ status: false, message: 'Your input should be in 5 to 40 characters for full name' });
      }
      if (!body.user_name || body.user_name == '') {
        return ({ status: false, message: 'User name required or not valid' });
      }
      if ((body.user_name).split(' ').length > 1) {
        return ({ status: false, message: 'User name must not contain a space' });
      }
      if (!body.email || body.email == '') {
        return ({ status: false, message: 'E-mail required or not valid' });
      }
      if (!validEmail(body.email)) {
        return ({ status: false, message: "E-mail not valid" });

      }
      if (!body.password || body.password == '') {
        return ({ status: false, message: 'Password required or not valid' });
      }
      if (body.password.length < 5) {
        return ({ status: false, message: 'Your input should be more than 5 characters for password' });
      }

      if (!body.role_id) {
        return ({ status: false, message: "Role ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body.role_id)) {
        return ({ status: false, message: "Role ID not valid" });
      }
      var roleFinder = await mongoose.model('Role', schema).findOne({ _id: body.role_id }).exec();
      if (!roleFinder) {
        return ({ status: false, message: 'Role not found' });
      }
      var item_finder = await mongoose.model('User', schema).findOne({ $or: [{ user_name: body.user_name }, { email: body.email }] }).exec();
      if (item_finder) {
        return ({ status: false, message: 'Doublicate happened in user name or E-mail' });
      } else
        return ({ status: true });
    case 'edit':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });

      }
      var findExistData = await mongoose.model('User', schema).findOne({ _id: body._id }).exec();
      if (findExistData) {
        return ({ status: false, message: 'Data not found for update' });
      }
      if (!body.full_name || body.full_name == '') {
        return ({ status: false, message: 'Full name required or not valid' });
      }
      if (body.full_name.length < 5 || body.full_name.length > 40) {
        return ({ status: false, message: 'Your input should be in 5 to 40 characters for full name' });
      }
      if (!body.user_name || body.user_name == '') {
        return ({ status: false, message: 'User name required or not valid' });
      }
      if ((body.user_name).split(' ').length > 1) {
        return ({ status: false, message: 'User name must not contain a space' });
      }
      if (!body.email || body.email == '') {
        return ({ status: false, message: 'E-mail required or not valid' });
      }
      if (!validEmail(body.email)) {
        return ({ status: false, message: "E-mail not valid" });

      }
      if (!body.role_id) {
        return ({ status: false, message: "Role ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body.role_id)) {
        return ({ status: false, message: "Role ID not valid" });

      }
      var roleFinder = await mongoose.model('Role', schema).findOne({ _id: body.role_id }).exec();
      if (!roleFinder) {
        return ({ status: false, message: 'Role not found' });
      }
      var item_finder = await mongoose.model('User', schema).findOne({ $and: [{ _id: { $ne: body._id } }, { $or: [{ user_name: body.user_name }, { email: body.email }] }] }).exec();
      if (item_finder) {
        return ({ status: false, message: 'Doublicate happened in user name or E-mail' });
      } else
        return ({ status: true });
    case 'delete':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });

      }
    case 'find':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });

      }
    default:
      break;
  }
}


schema.virtual("User", {
  ref: "User", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "user", // is equal to `foreignField`
  justOne: false,
});


// create the model for users and expose it to our app
module.exports = mongoose.model("User", schema);

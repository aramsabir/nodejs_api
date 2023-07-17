var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var schema = mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  resource: {
    type: String,
    default: "activity:self,data:self"
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

});



schema.methods.validation = async function (body, key) {

  switch (key) {

    case 'create':
      if (!body.name || body.name == '') {
        return ({ status: false, message: 'Role name required or not valid' });
      }
      if (body.name.length < 2 || body.name.length > 30) {
        return ({ status: false, message: 'Your input should be in 3 to 30 characters for role name' });
      }
      var item_finder = await mongoose.model('Role', schema).findOne({ $and:[{deleted_at:null},{name: body.name}] }).exec();
      if (item_finder) {
        return ({ status: false, message: 'Doublicated data' });
      } else
        return ({ status: true });
    case 'edit':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });
      }

      if (!body.name || body.name == '') {
        return ({ status: false, message: 'Role name required or not valid' });
      }
      if (body.name.length < 2 || body.name.length > 30) {
        return ({ status: false, message: 'Your input should be in 2 to 30 character for role name' });
      }
      var item_finder = await mongoose.model('Role', schema).findOne({ $and: [{ _id: { $ne: body._id } }, { name: body.name },{deleted_at:null}] }).exec();
      if (item_finder) {
        return ({ status: false, message: 'Doublicated data' });
      } else
        return ({ status: true });
    case 'delete':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });
      }
      return ({ status: true });

    case 'find':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });
      }
      return ({ status: true });

    default:
      break;
  }
}

schema.virtual("Role", {
  ref: "_id", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "Role", // is equal to `foreignField`
  justOne: false,
});


// create the model for users and expose it to our app
module.exports = mongoose.model("Role", schema);

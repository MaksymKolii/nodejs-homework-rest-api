const mongoose = require("mongoose");

const {Schema, model}= mongoose

const contactModel = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
    },
    // owner: {
    //     type: SchemaTypes.ObjectId,
    //     ref: 'user',
    //   }
  },

  { versionKey: false, timestamps: true }
);

module.exports = model('Contact', contactModel )



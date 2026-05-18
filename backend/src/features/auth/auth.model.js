const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,  // MongoDB index + unique constraint
    },
    aiTokenUsageAmount: {
      type: Number,
      default: 0
    },
    gcsStorageSizeUsed: {
      type: Number,
      default: 0
    }
  }
);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,  // MongoDB index + unique constraint
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false, // hide by default on read queries
    },
    role: {
      type: String,
      enum: ["guest", "user", "admin"],
      default: "guest",
    },
    aiTokenUsageAmount: {
      type: Number,
      default: 0
    },
    gcsStorageSizeUsed: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true
  }
);

module.exports.Company = mongoose.model("Company", companySchema);
module.exports.User = mongoose.model("User", userSchema);

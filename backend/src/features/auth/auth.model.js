const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    companyEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,  // MongoDB index + unique constraint
    },
    otp: {
      type: String,
      default: "",
      select: false, // hide by default on read queries
    },
    otpExpiry: {
      type: Date,
      default: 0,
      select: false, // hide by default on read queries
    },
    verified: {
      type: Boolean,
      default: false,
      select: false, // hide by default on read queries
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

const roleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      enum: ["invited", "member", "admin", "owner"],
    }
  }
);

const workspaceSchema = new mongoose.Schema(
  {
    workspaceName: {
      type: String,
      required: true,
      trim: true,
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

const workspaceMemberSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      ref: 'Role',
      default: "invited",
    },
  },
  { 
    timestamps: true
  }
);

module.exports.User = mongoose.model("User", userSchema);
module.exports.Role = mongoose.model("Role", roleSchema);
module.exports.Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports.WorkspaceMember = mongoose.model("WorkspaceMember", workspaceMemberSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "",
      trim: true,
    },
    companyEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,  // MongoDB index + unique constraint
    },
    isVerified: {
      type: Boolean,
      default: false,
      select: false, // hide by default on read queries
    },
    aiTokenUsageAmount: {
      type: Number,
      default: 0
    },
    cloudStorageUsage: {
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

const magicTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    hashedToken: {
      type: String,
      required: true,
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 900 // <--- TTL Index: Automatically deletes document after 15 minutes (900 seconds)
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
    cloudStorageUsage: {
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
      ref: "Workspace",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      ref: "Role",
      default: "invited",
    },
  },
  { 
    timestamps: true
  }
);

exports.User = mongoose.model("User", userSchema);
exports.Role = mongoose.model("Role", roleSchema);
exports.MagicToken = mongoose.model("MagicToken", magicTokenSchema);
exports.Workspace = mongoose.model("Workspace", workspaceSchema);
exports.WorkspaceMember = mongoose.model("WorkspaceMember", workspaceMemberSchema);

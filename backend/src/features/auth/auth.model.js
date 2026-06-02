const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      default: "",
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
    gcsStorageSizeUsed: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true
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

const workspaceInviteSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true
    },
    recipientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      ref: "Role",
      default: "invited"
    },
    hashedToken: {
      type: String,
      required: true,
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 7 // <--- TTL: Invitation automatically expires after 7 days
    }
  }
);

module.exports.User = mongoose.model("User", userSchema);
module.exports.MagicToken = mongoose.model("MagicToken", magicTokenSchema);
module.exports.Role = mongoose.model("Role", roleSchema);
module.exports.Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports.WorkspaceMember = mongoose.model("WorkspaceMember", workspaceMemberSchema);
module.exports.WorkspaceInvite = mongoose.model('WorkspaceInvite', workspaceInviteSchema);

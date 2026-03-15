const { mongoose } = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileName: String,
    fileSize: Number,
    tokensUsed: Number,
    timestamp: Number,
  }
);

const tokenSchema = new mongoose.Schema(
  {
    tokens: Number,
    timestamp: Number,
  }, 
  {
    _id: false
  }
);

const tokenUsageSchema = new mongoose.Schema(
  {
    embeddings: {
      data: [tokenSchema],
      total: {
        type: Number,
        default: 0
      }
    },
    chatCompletions: {
      data: [tokenSchema],
      total: {
        type: Number,
        default: 0
      }
    },
    total: {
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
      type: String,
      required: true,
      trim: true,
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
      enum: ["user", "admin"],
      default: "user",
    },
    uploadedFiles: {
      type: [fileSchema],
      select: false, // hide by default on read queries
    },
    tokensUsed: {
      type: tokenUsageSchema,
      select: false, // hide by default on read queries
    }
  },
  { 
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);

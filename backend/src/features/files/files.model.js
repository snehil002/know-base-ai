const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileSizeInBytes: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    uploaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    uploadingStatus: {
      type: String,
      enum: ["not_started", "completed"],
      default: "not_started",
    },
    indexingStatus: {
      type: String,
      enum: ["not_started", "downloading", "parsing", "embedding", "indexing", "completed"],
      default: "not_started",
    },
    gcsFileName: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true
  }
);

exports.File = mongoose.model("File", fileSchema);

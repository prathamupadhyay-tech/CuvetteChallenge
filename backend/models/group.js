import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  description: {
    type: String,

  },
  color: {
    type: String,
    
  },
  notes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Notes",
    },
  ],
});

export default mongoose.model("Group", groupSchema);
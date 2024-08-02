import mongoose from "mongoose";
let Schema = mongoose.Schema;

const Notes = new Schema(
  {
    des: {
      type: String,
      
    },
  },
  { timestamps: true }
);
export default mongoose.model("Notes", Notes);

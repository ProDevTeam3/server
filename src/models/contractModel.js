import { Schema, model } from "mongoose";

const contractSchema = new Schema({
  type: {
    type: String,
  },
  income: {
    type: Number,
  },
  currency: {
    type: String,
  },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
});
export default model("Contract", contractSchema);

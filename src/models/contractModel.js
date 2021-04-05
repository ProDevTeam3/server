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
});
export default model("Contract", contractSchema);

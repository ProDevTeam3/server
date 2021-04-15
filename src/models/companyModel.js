import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
  },
  NIP: {
    type: String,
  },
  industry: {
    type: String,
  },
});
export default model("Company", companySchema);

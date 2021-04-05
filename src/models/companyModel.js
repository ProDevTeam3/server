import { Schema, model } from "mongoose";
import { contractScheme } from "./contractModel";

const companySchema = new Schema({
  name: {
    type: String,
  },
  NIP: {
    type: String,
  },
  contract: [contractScheme],
});
export default model("Company", companySchema);

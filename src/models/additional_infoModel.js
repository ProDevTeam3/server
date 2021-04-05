import { Schema, model } from "mongoose";

const additional_infoSchema = new Schema({
  internet_access: {
    type: Boolean,
  },
  family_income: {
    type: Number,
  },
  num_of_cars_in_family: {
    type: Number,
  },
  disability: {
    type: String || null,
  },
});
export default model("Additional_info", additional_infoSchema);

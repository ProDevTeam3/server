import { Schema, model } from "mongoose";

const accomodationSchema = new Schema({
  with_parents: {
    type: Boolean,
    required: [true, "Pass true or false in WITH PARENTS in ACCOMODATION"],
  },
  num_of_residents: {
    type: Number,
    required: [true, "Pass number of residents in ACCOMODATION"],
  },
  house_type: {
    type: String,
    required: [true, "Pass type of house (required!)"],
  },
});
export default model("Accomodation", accomodationSchema);

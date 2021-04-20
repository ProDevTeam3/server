import { Schema, model } from "mongoose";
import { isPesel, isSex } from "./Validators";

const familySchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  type: {
    type: String,
  },
  PESEL: {
    type: String,
    validate: {
      validator: isPesel,
      message: "Enter correct PESEL",
    },
  },
  date_of_birth: {
    type: Date,
  },
  sex: {
    type: String,
    required: [true, "Enter sex type"],
    validate: {
      validator: isSex,
      message: "Enter correct sex",
    },
  },
});
export default model("Family", familySchema);

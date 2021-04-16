import { isEducation, isMartialStatus, isPesel, isSex } from "./Validators";
import { Schema, model } from "mongoose";

const mainSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "Enter appropriate first Name"],
  },
  middle_name: {
    type: String,
  },
  surname: {
    type: String,
    required: [true, "Enter appropriate surname"],
  },
  nationality: {
    type: String,
    required: [true, "Enter appropriate nationality"],
  },
  sex: {
    type: String,
    required: [true, "Enter sex type"],
    validate: {
      validator: isSex,
      message: "Enter correct sex",
    },
  },
  PESEL: {
    type: String,
    validate: {
      validator: isPesel,
      message: "Enter correct PESEL CODE",
    },
  },
  date_of_birth: {
    type: Date,
  },
  marital_status: {
    type: String,
    validate: {
      validator: isMartialStatus,
      message: "Enter correct Martial Status",
    },
  },
  education: {
    type: String,
    validate: {
      validator: isEducation,
      message: "Enter correct education status",
    },
  },
  home_address: { type: Schema.Types.ObjectId, ref: "Address" },
  registered_address: { type: Schema.Types.ObjectId, ref: "Address" },
  contract: [{ type: Schema.Types.ObjectId, ref: "Contract" }],
  family: [{ type: Schema.Types.ObjectId, ref: "Family" }],
  accomodation: { type: Schema.Types.ObjectId, ref: "Accomodation" },
  additional_info: { type: Schema.Types.ObjectId, ref: "Additional_info" },
});

export default model("Main", mainSchema);

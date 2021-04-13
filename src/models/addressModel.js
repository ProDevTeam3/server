import { Schema, model } from "mongoose";
import { isVoideShip, isCountry, isPostal } from "./Validators";

const addressSchema = new Schema({
  street: {
    type: String,
  },
  postal_code: {
    type: String,
    validate: {
      validator: isPostal,
      message: "Enter correct postal code",
    },
    required: [true, "Postal code is required !"],
  },
  city: {
    type: String,
    required: [true, "City possition is required !"],
  },
  district: {
    type: String,
    required: [true, "District is required !"],
  },
  commune: {
    type: String,
    required: [true, "Commune is required !"],
  },
  voivodeship: {
    type: String,
    validate: {
      validator: isVoideShip,
      message: "Enter correct voivodeship !",
    },
    required: [true, "City possition is required !"],
  },
  country: {
    type: String,
    // validate: {
    // validator: isCountry,
    // message: "Enter correct country name",
    // },
    required: [true, "Enter country name"],
  },
});
export default model("Address", addressSchema);

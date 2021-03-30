import { isPesel, isSex } from "./Validators";
const familySchema = new Schema({
  type: {
    type: String,
  },
  PESEL: {
    type: Int32Array,
    validate: [isPesel, "Enter correct PESEL CODE"],
  },
  date_of_birth: {
    type: Date,
  },
  sex: {
    type: String,
    required: [true, "Enter sex type"],
    validate: [isSex, "Enter correct sex"],
  },
});
export default familySchema;

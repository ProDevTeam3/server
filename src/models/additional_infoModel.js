const additional_infoSchema = new Schema({
  internet_access: {
    type: Boolean,
  },
  family_income: {
    type: Int32Array,
  },
  num_of_cars_in_family: {
    type: Int8Array,
  },
  disability: {
    type: String || null,
  },
});
export default additional_infoSchema;

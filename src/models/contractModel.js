const contractScheme = new Schema({
  type: {
    type: String,
  },
  income: {
    type: Int32Array,
  },
  currency: {
    type: String,
  },
});
export default contractScheme;

export const notRepeat = async (data, model) => {
  const checkOfResult = await model.find(data);
  return checkOfResult.length === 0;
};

export const notRepeatCitizen = async (pesel, model) => {
  const checkOfResult = await model.find({ PESEL: pesel });
  return checkOfResult.length === 0;
};

// Uwaga funkcja zwraca promise.

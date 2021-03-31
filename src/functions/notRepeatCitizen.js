export const notRepeatCitizen = async (pesel, person) => {
    const checkOfResult = await person.find({ PESEL: pesel });
    return checkOfResult.length;
};

// Uwaga funkcja zwraca promise.
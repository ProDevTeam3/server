const notRepeatCitizen = async (pesel, person) => {
    const checkOfResult = await person.find({ PESEL: pesel });
    return checkOfResult.length === 0 ? true : false;
};

// Uwaga funkcja zwraca promise.
module.exports = notRepeatCitizen;
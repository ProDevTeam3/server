import {isVoideShip, isCountry, isPostal} from './Validators'
const addressSchema = new Schema({
    street: {
        type: String
    },
    postal_code: {
        type: String,
        validate: [isPostal, "Enter correct postal code"],
        required: [true, "Postal code is required !"]
    },
    city: {
        type: String,
        required: [true, "City possition is required !"]
    },
    district: {
        type: String,
        required: [true, "District is required !"]
    },
    commune: {
        type: String,
        required: [true, "Commune is required !"]
    },
    voivodeship: {
        type: String,
        validate: [isVoideShip, "Enter correct voivodeship !"],
        required: [true, "City possition is required !"]
    },
    country: {
        type: String,
        validate: [isCountry, "Enter correct country name"],
        required: [true, "Enter country name"]
    }
})
export default addressSchema
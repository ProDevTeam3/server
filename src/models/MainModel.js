const { Schema, model } = require('mongoose');
import {countries} from './countries'
/*
const isEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
*/
const isSex = function(sex) {
    if(sex === "M" || sex === "K"){
        return true
    }
    else{
        return false
    }
}
const isPesel = function(pesel){
    if(pesel.toString().length() === 12){
        return true
    }
    else{
        return false
    }
}
const isMartialStatus = function(status){
    const statuses = ["ŻONATY", "MĘŻATKA", "KAWALER", "PANNA"]
    if(statuses.includes(status)){
        return true
    }
    else{
        return false
    }
}
const isEducation = function(edu){
    const educs = ["PODSTAWOWE", "ŚREDNIE", "WYŻSZE"]
    if(educs.includes(edu)){
        return true
    }
    else{
        return false
    }
}
const isPostal = function(code){
    if(code.length() === 6){
        return true
    }
    else{
        return false
    }
}
const isVoideShip = function(voide){
    const voides = ["dolnośląskie", "kujawsko-pomorskie", "lubelskie", "lubuskie", "łódzkie", "małopolskie", "mazowieckie", "opolskie", "podkarpackie", "podlaskie", "pomorskie", "śląskie", "świętokrzyskie", "warmińsko-mazurskie", "wielkopolskie", "zachodniopomorskie"]
    if(voides.includes(voide)){
        return true
    }
    else{
        return false
    }
}
const isCountry = function(country){
    const countries_name = countries.map(c => c.name)
    if(countries_name.includes(country)){
        return true
    }
    else{
        return false
    }
}
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
const familySchema = new Schema({
    type: {
        type: String
    },
    PESEL: {
        type: Int32Array,
        validate: [isPesel, "Enter correct PESEL CODE"]
    },
    date_of_birth: {
        type: Date
    },
    sex: {
        type: String,
        required: [true, "Enter sex type"],
        validate: [isSex, "Enter correct sex"]
    }
})
const mainSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "Enter Appropriate First Name"]
    },
    middle_name: {
        type: String
    },
    surname: {
        type: String,
        required: [true, "Enter Appropriate Surname"]
    },
    sex: {
        type: String,
        required: [true, "Enter sex type"],
        validate: [isSex, "Enter correct sex"]
    },
    PESEL: {
        type: Int32Array,
        validate: [isPesel, "Enter correct PESEL CODE"]
    },
    date_of_birth: {
        type: Date
    },
    marital_status: {
        type: String,
        validate: [isMartialStatus, "Enter correct Martial Status"]
    },
    education: {
        type: String,
        validate: [isEducation, "Enter correct education status"]
    },
    home_address: [
        addressSchema
    ],
    registered_address: [
        addressSchema
    ],
    company: [
        {
        "name": "Renault",
        "NIP": "999012030213",
        "contract": [
            {
            "type": "UOP",
            "income": 30000,
            "currency": "PLN"
            }
        ]
        }
    ],
    family: [
        familySchema
    ],
    "accomodation": {
        "with_parents": true,
        "num_of_residents": 3,
        "house_type": "BLOK"
    },
    "additional_info": {
        "internet_access": true,
        "family_income": 90000,
        "num_of_cars_in_family": 2,
        "disability": null
    }
});

module.exports = model('Main', mainSchema);
import {accomodationSchema} from './accomodationModel'
import {additional_infoSchema} from './additional_infoModel'
import {addressSchema} from './addressModel'
import {companyScheme} from './companyModel'
import {familySchema} from './familyModel'
import {isEducation, isMartialStatus, isPesel, isSex} from './Validators'






const { Schema, model } = require('mongoose');

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
        companyScheme
    ],
    family: [
        familySchema
    ],
    accomodation: [
        accomodationSchema
    ],
    additional_info: [
        additional_infoSchema
    ]
});

module.exports = model('Main', mainSchema);

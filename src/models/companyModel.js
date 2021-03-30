import {contractScheme} from './contractModel'

const companyScheme = new Schema({
    name: {
        type: String
    },
    NIP: {
        type: String
    },
    contract: [
        contractScheme
    ]
})
export default companyScheme
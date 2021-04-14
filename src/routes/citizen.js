import Express from "express";
import regeneratorRuntime from "regenerator-runtime";
const router = Express.Router({ mergeParams: true });
import Main from "../models/MainModel";
import Address from "../models/addressModel";
import Contract from "../models/contractModel";
import Family from "../models/familyModel";
import Accomodation from "../models/accomodationModel";
import Additional_info from "../models/additional_infoModel";
import { notRepeatCitizen } from "../functions/notRepeatCitizen";
import { notRepeat } from "../functions/notRepeat";

router.post("/addCitizen", async (req, res) => {
  try {
    const {
      PESEL,
      home_address,
      registered_address,
      contract,
      family,
      accomodation,
      additional_info,
    } = req.body;
    // Sprawdzenie czy obywatel już istnieje
    if (await notRepeatCitizen(PESEL, Main)) {
      // Sprawdzenie czy adres domowy już istnieje, jeśli nie to zostanie utworzony
      if (await notRepeat(home_address, Address)) {
        await Address.create(home_address);
      }
      // Znalezienie id dla adresu domowego
      const findHomeAdress = await Address.find(home_address);
      const idHomeAdress = findHomeAdress[0]["_id"];

      // Sprawdzenie czy adres zameldowania już istnieje, jeśli nie to zostanie utworzony
      if (await notRepeat(registered_address, Address)) {
        await Address.create(registered_address);
      }
      // Znalezienie id dla adresu zameldowania
      const findRegistredAdress = await Address.find(registered_address);
      const idRegistredAdress = findRegistredAdress[0]["_id"];

      // Sprawdzenie czy umowy już istniejeją, jeśli nie to zostaną utworzone
      const idContracts =
        contract !== null
          ? contract.map(async (contract) => {
            if (await notRepeat(contract, Contract)) {
              await Contract.create(contract);
            }
            const findContract = await Contract.find(contract);
            const idContract = await findContract[0]["_id"];
            return idContract;
          })
          : null;
      // Znalezienie id dla umów
      if (idContracts !== null) {
        for (let index = 0; index < idContracts.length; index++) {
          idContracts[index] = await idContracts[index];
        }
      };

      // Sprawdzenie czy członkowie rodziny już istniejeją, jeśli nie to zostaną utworzeni
      const idPeopleOfFamily =
        family !== null
          ? family.map(async (person) => {
            if (await notRepeatCitizen(person.PESEL, Family)) {
              await Family.create(person);
            }
            const findPerson = await Family.find(person);
            const idPerson = await findPerson[0]["_id"];
            return idPerson;
          })
          : null;
      // Znalezienie id członków rodziny
      if (idPeopleOfFamily !== null) {
        for (let index = 0; index < idPeopleOfFamily.length; index++) {
          idPeopleOfFamily[index] = await idPeopleOfFamily[index];
        }
      };

      // Sprawdzenie czy zakwaterowanie już istnieje, jeśli nie to zostanie utworzone
      if (await notRepeat(accomodation, Accomodation)) {
        await Accomodation.create(accomodation);
      }
      // Znalezienie id zakwaterowania
      const findAccomodation = await Accomodation.find(accomodation);
      const idAccomodation = findAccomodation[0]["_id"];

      // Sprawdzenie czy dodatkowe informacje już istnieją, jeśli nie to zostaną utworzone
      if (await notRepeat(additional_info, Additional_info)) {
        await Additional_info.create(additional_info);
      }
      // Znalezienie id dodatkowych informacji
      const findAdditionalInfo = await Additional_info.find(additional_info);
      const idAdditionalInfo = findAdditionalInfo[0]["_id"];

      // Zapisanie nowego obywatela
      await Main.create({
        ...req.body,
        home_address: idHomeAdress,
        registered_address: idRegistredAdress,
        contract: idContracts,
        family: idPeopleOfFamily,
        accomodation: idAccomodation,
        additional_info: idAdditionalInfo,
      });

      res.send("Add citizen");
    } else {
      res.send("Not add citizen");
    }
  } catch (error) {
    res.send("error" + error);
  }
});
export default router;

// Przykład

// {
//   "id": 1,
//     "first_name": "Jan",
//       "middle_name": null,
//         "surname": "Kowalski",
//           "sex": "M",
//             "PESEL": "000000000000",
//               "date_of_birth": "2020-01-01",
//                 "marital_status": "KAWALER",
//                   "education": "ŚREDNIE",
//                     "home_address": {
//     "street": "Polna",
//       "postal_code": "80-000",
//         "city": "Gdansk",
//           "district": "Gdansk",
//             "commune": "Gdansk",
//               "voivodeship": "pomorskie",
//                 "country": "Polska"
//   },
//   "registered_address": {
//     "street": "Polna",
//       "postal_code": "80-000",
//         "city": "Gdansk",
//           "district": "Gdansk",
//             "commune": "Gdansk",
//               "voivodeship": "pomorskie",
//                 "country": "Polska"
//   },
//   "contract": [
//     {
//       "type": "UOP",
//       "income": 30000,
//       "currency": "PLN",
//       "branch": "budownictwo",
//       "name": "Renault",
//       "NIP": "999012030213"
//     }],
//     "family": [
//       {
//         "type": "PARTNER",
//         "PESEL": "000000000001",
//         "date_of_birth": "2020-01-01",
//         "sex": "K"
//       },
//       {
//         "type": "DZIECKO",
//         "PESEL": "000000000002",
//         "date_of_birth": "2020-01-01",
//         "sex": "M"
//       }
//     ],
//       "accomodation": {
//     "with_parents": true,
//       "num_of_residents": 3,
//         "house_type": "BLOK"
//   },
//   "additional_info": {
//     "internet_access": true,
//       "family_income": 90000,
//         "num_of_cars_in_family": 2,
//           "disability": null
//   }
// }

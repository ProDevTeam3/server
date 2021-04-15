import Express from "express";
import regeneratorRuntime from "regenerator-runtime";
const router = Express.Router({ mergeParams: true });
import Main from "../models/MainModel";
import Address from "../models/addressModel";
import Contract from "../models/contractModel";
import Family from "../models/familyModel";
import Accomodation from "../models/accomodationModel";
import Additional_info from "../models/additional_infoModel";
import Company from "../models/companyModel";
import { notRepeatCitizen } from "../functions/notRepeatCitizen";
import { notRepeat } from "../functions/notRepeat";

router.post("/addCitizen", async (req, res) => {
  try {
    const {
      PESEL,
      home_address,
      registered_address,
      company,
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

      // Szukanie id kontraktów i firm
      if (company.length > 0) {
        for (let index = 0; index < company.length; index++) {
          const { name, NIP, industry, contract } = company[index];
          const dataCompany = { name: name, NIP: NIP, industry: industry };
          // Sprawdzenie czy firma już istnieje, jeśli nie to zostanie utworzona
          if (await notRepeat(dataCompany, Company)) {
            await Company.create(dataCompany);
          }
          // Znalezienie id firmy
          const findCompany = await Company.find(dataCompany);
          const idCompany = await findCompany[0]["_id"];

          if (contract.length > 0) {
            for (let index = 0; index < contract.length; index++) {
              const dataContract = { ...contract[index], company: idCompany };
              // Sprawdzenie czy kontrakt już istnieje, jeśli nie to zostanie utworzony
              if (await notRepeat(dataContract, Contract)) {
                await Contract.create(dataContract);
              }
              // Znalezienie id kontraktu
              const findContract = await Contract.find(dataContract);
              contract[index] = await findContract[0]["_id"];
            }
            company[index] = contract;
          }
        }
      }

      // Znalezienie id dla kontraktów
      const idContracts = await company.reduce((total, amount) => {
        return [...total, ...amount];
      }, []);

      const notRepeatFamily = family.reduce((total, amount) => {
        return !total.includes(amount.PESEL) ? [...total, amount.PESEL] : total;
      }, []);

      // Sprawdzenie czy członkowie rodziny już istniejeją, jeśli nie to zostaną utworzeni
      if (
        notRepeatFamily.length !== family.length ||
        notRepeatFamily.includes(PESEL)
      ) {
        res.send("Enter appropriate PESELE in family");
      } else {
        if (family.length > 0) {
          for (let index = 0; index < family.length; index++) {
            if (await notRepeatCitizen(family[index].PESEL, Family)) {
              await Family.create(family[index]);
            }
            const findPerson = await Family.find({
              PESEL: family[index].PESEL,
            });
            family[index] = await findPerson[0]["_id"];
          }
        }
      }
      // Znalezienie id członków rodzinny
      const idPeopleOfFamily = family.reduce((total, amount) => {
        return !total
          .map((element) => element.toString())
          .includes(amount.toString())
          ? [...total, amount]
          : total;
      }, []);

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
//           "nationality": "Polska",
//             "sex": "M",
//               "PESEL": "000000000012",
//                 "date_of_birth": "2020-01-01",
//                   "marital_status": "KAWALER",
//                     "education": "ŚREDNIE",
//                       "home_address": {
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
//   "company": [
//     {
//       "name": "Renalut",
//       "NIP": "123456789",
//       "industry": "Samochodowy",
//       "contract": [
//         {
//           "type": "Umowa o dzieło",
//           "income": "2200",
//           "currency": "EUR"
//         },
//         {
//           "type": "Umowa o dzieło",
//           "income": "2000",
//           "currency": "PLN"
//         }
//       ]
//     }
//   ],
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

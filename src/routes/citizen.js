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
      if (company?.length > 0) {
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

          if (contract?.length > 0) {
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
      const idContracts = await (company ?? []).reduce((total, amount) => {
        return [...total, ...amount];
      }, []);

      const notRepeatFamily = (family ?? []).reduce((total, amount) => {
        return !total.includes(amount.PESEL) ? [...total, amount.PESEL] : total;
      }, []);

      // Sprawdzenie czy członkowie rodziny już istniejeją, jeśli nie to zostaną utworzeni
      if (
        notRepeatFamily.length !== (family ?? []).length ||
        notRepeatFamily.includes(PESEL)
      ) {
        return res.send("Wpisz odpowiedni PESEL w członkach rodziny");
      } else {
        if (family?.length > 0) {
          for (let index = 0; index < family.length; index++) {
            if (await notRepeatCitizen(family[index].PESEL, Family)) {
              await Family.create(family[index]);
            }
            // Znalezienie id członka rodzinny
            const findPerson = await Family.find({
              PESEL: family[index].PESEL,
            });
            family[index] = await findPerson[0]["_id"];
          }
        }
      }

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
        accomodation: idAccomodation,
        additional_info: idAdditionalInfo,
      });

      return res.send("Pomyślnie dodano obywatela do bazy danych");
    } else {
      return res
        .status("400")
        .send("Obywatel o danym numerze PESEL znajduje się już w bazie danych");
    }
  } catch (error) {
    return res.status("400").send("error" + error);
  }
});

router.put("/updateCitizen/:id", async (req, res) => {
  try {
    const id = req.params.id;
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
    if (await !notRepeatCitizen(PESEL, Main)) {
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
      if (company?.length > 0) {
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

          if (contract?.length > 0) {
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
      const idContracts = await (company ?? []).reduce((total, amount) => {
        return [...total, ...amount];
      }, []);

      const notRepeatFamily = (family ?? []).reduce((total, amount) => {
        return !total.includes(amount.PESEL) ? [...total, amount.PESEL] : total;
      }, []);

      // Sprawdzenie czy członkowie rodziny już istniejeją, jeśli nie to zostaną utworzeni
      if (
        notRepeatFamily.length !== (family ?? []).length ||
        notRepeatFamily.includes(PESEL)
      ) {
        return res.send("Wpisz odpowiedni PESEL w członkach rodziny");
      } else {
        if (family?.length > 0) {
          for (let index = 0; index < family.length; index++) {
            if (await notRepeat(family[index], Family)) {
              await Family.create(family[index]);
            }
            // Znalezienie id członka rodzinny
            const findPerson = await Family.find(family[index]);
            family[index] = await findPerson[0]["_id"];
          }
        }
      }

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

      await Main.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
          home_address: idHomeAdress,
          registered_address: idRegistredAdress,
          contract: idContracts,
          accomodation: idAccomodation,
          additional_info: idAdditionalInfo,
        }
      );

      return res.send("Pomyślnie zaktualizowane dane obywatela w bazie danych");
    } else {
      return res.send(
        "Obywatel o danym numerze PESEL nie znajduje się w bazie danych"
      );
    }
  } catch (error) {
    return res.status("400").send("error" + error);
  }
});

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
//         "name": "Ala",
//         "surname": "Kowalska",
//         "type": "PARTNER",
//         "PESEL": "000000000001",
//         "date_of_birth": "2020-01-01",
//         "sex": "K"
//       },
//       {
//         "name": "Bartosz",
//         "surname": "Kowalski",
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

router.delete("/deleteCitizen/:PESEL", async (req, res) => {
  try {
    const PESEL = req.params.PESEL.toString();
    const deleteCitizen = await Main.findOneAndDelete({ PESEL: PESEL });

    if (deleteCitizen === null) {
      res.send(`Nie znaleziono obywatela o PESELU: ${PESEL}`);
    } else {
      res.send(`Usunięto obywatela o PESELU: ${PESEL}`);
    }
  } catch (error) {
    res.status("400").send("error" + error);
  }
});

// Przykład:
// http://localhost:5000/citizen/getCitizen/000000000014

router.get("/getCitizen/:PESEL", async (req, res) => {
  try {
    const PESEL = req.params.PESEL.toString();
    const findCitizen = await Main.findOne({ PESEL: PESEL })
      .populate({ path: "contract", populate: { path: "company" } })
      .populate("family")
      .populate("home_address")
      .populate("registered_address")
      .populate("accomodation")
      .populate("additional_info");

    if (findCitizen === null) {
      res.send(`Nie znaleziono obywatela o PESELU: ${PESEL}`);
    } else {
      res.send(findCitizen);
    }
  } catch (error) {
    res.status("400").send("error" + error);
  }
});

// Przykłady:
// http://localhost:5000/citizen/getCitizens?page=0&limit=6
// http://localhost:5000/citizen/getCitizens?page=1&limit=6

router.get("/getCitizens", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const allCitizens = await Main.find();

    const findCitizens = await Main.aggregate()
      .project({ _id: 1, PESEL: 1, first_name: 1, surname: 1 })
      .sort({ _id: 1 })
      .skip(page * limit)
      .limit(limit);

    if (findCitizens.length === 0) {
      res.send(`Nie znaleziono obywateli`);
    } else {
      res.send({ citizens: findCitizens, size: allCitizens.length });
    }
  } catch (error) {
    res.status("400").send("error" + error);
  }
});

export default router;

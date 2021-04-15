import express from "express";
import regeneratorRuntime from "regenerator-runtime";
const router = express.router({ mergeParams: true });
const Main = require("../models/MainModel");

router.get("/nationalityByRegion", async (req, res) => {
  try {
    const citizens = await Main.find().populate("registered_address");

    const regions = citizens.reduce((citizen, accumulator) => {
      const region = citizen.registered_address.voivodeship;
      const nationality = citizen.nationality;

      const isRegionPresent = !!accumulator[regions];
      const isNationalityPresent = isRegionPresent
        ? !!accumulator[regions][nationality]
        : false;

      if (isRegionPresent) {
        if (isNationalityPresent) {
          return {
            ...accumulator,
            [region]: {
              ...accumulator[region],
              [nationality]: accumulator[region][nationality] + 1,
            },
          };
        } else {
          return {
            ...accumulator,
            [region]: {
              ...accumulator[region],
              [nationality]: 1,
            },
          };
        }
      } else {
        return {
          ...accumulator,
          [region]: {
            [nationality]: 1,
          },
        };
      }
    }, {});
    return res.json({ regions });
  } catch (error) {
    return res.json({ errorMessage: error });
  }
});

router.get("/industryByNationality", async (req, res) => {
  try {
    const citizens = await Main.find().populate("contract").populate("company");

    const nationalities = citizens.reduce((citizen, accumulator) => {
      const nationality = citizen.nationality;
      const industriesDuplicates = citizen.contract.map(
        (contractSingle) => contractSingle.company.industry
      );
      const industries = industriesDuplicates.filter(
        (v, i, a) => a.indexOf(v) === i
      );

      const isNationalityPresent = !!accumulator[nationality];

      if (isNationalityPresent) {
        return {
          ...accumulator,
          [nationality]: {
            ...accumulator[nationality],
            ...industries.reduce((industry, accumulator2) => {
              const industryValue = accumulator[nationality][industry];
              if (industryValue) {
                return { ...accumulator2, [industry]: industryValue + 1 };
              } else {
                return { ...accumulator2, [industry]: 1 };
              }
            }, {}),
          },
        };
      } else {
        return {
          ...accumulator,
          [nationality]: industries.reduce(
            (industry, accumulator2) => ({ ...accumulator2, [industry]: 1 }),
            {}
          ),
        };
      }
    }, {});
    return res.json({ nationalities });
  } catch (error) {
    return res.json({ errorMessage: error });
  }
});
export default router;

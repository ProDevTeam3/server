import express from "express";
import regeneratorRuntime from "regenerator-runtime";
const router = express.router({ mergeParams: true });
const Main = require("../models/MainModel");

router.get("/nationalityByRegion", async (req, res) => {
  try {
    const citizens = await Main.find().populate("registered_address");

    const regions = citizens.reduce((citizen, accumulator) => {
      // const result = await Main.aggregate([
      //   {
      //     $unwind: {path: '$home_address'}
      //   },
      //   {
      //     $unwind: {path: '$registered_address'}
      //   },
      //   {
      //     $group: {
      //       _id: null,
      //       citizens: {$sum: 1},
      //       region: {$first: '$'}
      //     }
      //   }
      // ])

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
export default router;

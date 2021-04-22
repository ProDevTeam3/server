import Express from "express";
import regeneratorRuntime from "regenerator-runtime";
const router = Express.Router({ mergeParams: true });
import Main from "../models/MainModel";
import {
  contractType,
  accomodationType,
  education,
  marital,
  sex,
} from "../models/constants";

// pierwsza wartość: nationality, city, voivodeship, district, commune
// druga wartość: contract, martial_status, sex, education, accomodation
router.get("/", async (req, res) => {
  try {
    const selectFirst = req.query.First;
    const selectSecond = req.query.Second;
    const size = parseInt(req.query.Third);
    const keys = {
      contract: contractType,
      sex: sex,
      marital_status: marital,
      education: education,
      accomodation: accomodationType,
    };

    const find = await Main.aggregate()
      .lookup({
        from: "contracts",
        localField: "contract",
        foreignField: "_id",
        as: "contract",
      })
      .lookup({
        from: "accomodations",
        localField: "accomodation",
        foreignField: "_id",
        as: "accomodation",
      })
      .lookup({
        from: "addresses",
        localField: "registered_address",
        foreignField: "_id",
        as: "registered_address",
      })
      .project({
        _id: 0,
        nationality: 1,
        city: "$registered_address.city",
        voivodeship: "$registered_address.voivodeship",
        district: "$registered_address.district",
        commune: "$registered_address.commune",
        contract: "$contract.type",
        sex: 1,
        marital_status: 1,
        education: 1,
        accomodation: "$accomodation.house_type",
      })
      .unwind(`$${selectSecond}`);

    const groupByFirst = find.reduce((total, amount) => {
      !total[amount[selectFirst]]
        ? (total[amount[selectFirst]] = [amount])
        : (total[amount[selectFirst]] = [
            ...total[amount[selectFirst]],
            amount,
          ]);
      return total;
    }, {});
    const groupBySecond = Object.keys(groupByFirst).map((element) => {
      return {
        First: element,
        Second: groupByFirst[element].reduce((total1, amount1) => {
          !total1[amount1[selectSecond]]
            ? (total1[amount1[selectSecond]] = [
                { name: amount1[selectSecond] },
              ])
            : (total1[amount1[selectSecond]] = [
                ...total1[amount1[selectSecond]],
                { name: amount1[selectSecond] },
              ]);
          return total1;
        }, {}),
      };
    });

    const result = groupBySecond.map(({ First, Second }) => ({
      label: First,
      values: keys[selectSecond].map((element) => ({
        name: element,
        value: Second[element] === undefined ? 0 : Second[element].length,
      })),
    }));

    const indices = result
      .map((next, index) => [
        next.values.reduce((acc, el) => acc + el.value, 0),
        index,
      ])
      .sort((a, b) => b[0] - a[0])
      .slice(0, size)
      .map((next) => next[1]);

    const reduced = result.filter((next, index) => indices.includes(index));

    res.send(reduced);
  } catch (error) {
    res.status("400").send("error" + error);
  }
});

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

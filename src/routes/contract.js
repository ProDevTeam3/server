import Express from "express";
import regeneratorRuntime from "regenerator-runtime";
const router = Express.Router({ mergeParams: true });
import Main from "../models/MainModel";
import { contractType } from "../models/contracts";

router.get("/", async (req, res) => {
  try {
    const contractWithNationality = await Main.aggregate()
      .lookup({
        from: "contracts",
        localField: "contract",
        foreignField: "_id",
        as: "contract",
      })
      .project({ _id: 0, nationality: 1, contract: "$contract.type" })
      .unwind("$contract");

    const groupByNationality = contractWithNationality.reduce(
      (total, amount) => {
        !total[amount.nationality]
          ? (total[amount.nationality] = [amount])
          : (total[amount.nationality] = [
              ...total[amount.nationality],
              amount,
            ]);
        return total;
      },
      {}
    );

    const groupByContract = Object.keys(groupByNationality).map(
      (nationality) => {
        return {
          nationality: nationality,
          contracts: groupByNationality[nationality].reduce(
            (total1, amount1) => {
              !total1[amount1.contract]
                ? (total1[amount1.contract] = [{ name: amount1.contract }])
                : (total1[amount1.contract] = [
                    ...total1[amount1.contract],
                    { name: amount1.contract },
                  ]);
              return total1;
            },
            {}
          ),
        };
      }
    );

    const result = groupByContract.map(({ nationality, contracts }) => ({
      nationality: nationality,
      contracts: contractType.map((contract) => ({
        name: contract,
        value:
          contracts[contract] === undefined ? 0 : contracts[contract].length,
      })),
    }));
    res.send(result);
  } catch (error) {
    res.send("error" + error);
  }
});
export default router;

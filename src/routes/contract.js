import Express from "express";
import regeneratorRuntime from "regenerator-runtime";
const router = Express.Router({ mergeParams: true });
import Main from "../models/MainModel";

router.get("/", async (req, res) => {
  try {
    const result = await Main.aggregate()
      .lookup({
        from: "contracts",
        localField: "contract",
        foreignField: "_id",
        as: "contract",
      })
      .project({ _id: 0, contract: "$contract.type" })
      .unwind("$contract")
      .group({
        _id: "$contract",
        type: { $first: "$contract" },
        count: { $sum: 1 },
      });

    res.send(result);
  } catch (error) {
    res.send("error" + error);
  }
});
export default router;

// Zwracany wynik przykład
// result =
// [
//     {
//         "_id": "Umowa o dzieło",
//         "type": "Umowa o dzieło",
//         "count": 4
//     },
//     {
//         "_id": "Umowa o prace",
//         "type": "Umowa o prace"",
//         "count": 1
//     }
// ]

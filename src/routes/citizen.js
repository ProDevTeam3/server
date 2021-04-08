import Express from "express";
import regeneratorRuntime from "regenerator-runtime";
const router = Express.Router({ mergeParams: true });
const Main = require("../models/MainModel");

router.post("/addCitizen", async (req, res) => {
  try {
    const person = new Main(req.body);
    const saved = await person.save();
    return res.send({ savedId: saved.PESEL });
  } catch (error) {
    return res.send({ errorMessage: error });
  }
});
export default router;

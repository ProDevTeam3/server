import Express from "express";
const router = Express.Router({ mergeParams: true });
const Main = require("../models/Main");

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

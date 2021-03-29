const express = require('express');
const router = express.Router({mergeParams: true});
// const Main = require('../models/Main');

class Main {
    constructor(args) {
        this.PESEL = args.PESEL
    }
    async save() {
        return this
    }
}

router.post('/addCitizen', async (req, res) => {
    try {
      const person = new Main({...req.body})
      const saved = await person.save()
      return res.send({savedId: saved.PESEL});
    }
    catch(error) {
      return res.send({errorMessage: error})
    }
      
  });
module.exports = router;
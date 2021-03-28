require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({message: 'Hello World!'})
})

const port = process.env.PORT
const host = process.env.HOST
app.listen(port, () => {
    console.log(`server listening at http://${host}:${port}`);
});
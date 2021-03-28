import cors from "cors"
import express from "express"

require('dotenv').config();

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
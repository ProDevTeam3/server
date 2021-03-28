require('dotenv').config();
module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    mongoHost: process.env.MONGO_HOST,
    mongoPort: process.env.MONGO_PORT,
    mongoDb: process.env.MONGO_DATABASE,
};

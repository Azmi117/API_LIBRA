require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DATABASE_URL,
        "host": process.env.HOST,
        "dialect": process.env.DB_DIALECT,
      }
}
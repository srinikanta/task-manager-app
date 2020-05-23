const Pool = require('pg').Pool;
const config = require('config');

const Sequelize = require('sequelize');

class Database {
  constructor() {
    //this._con = new Pool(config.get('db'));
    const dbConfig = config.get('db');
    this._sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        dialect: 'postgres',
        define: {
          timestamps: false
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
    this._sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  }
  get connection() {
    return this._sequelize;
  }
}

module.exports = new Database();

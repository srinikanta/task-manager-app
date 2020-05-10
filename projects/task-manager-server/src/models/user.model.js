const db = require("../helpers/database-helper");
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Login extends Model {
}

Login.init({
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    primaryKey: true
  },
  userName: {
    type: Sequelize.STRING,
    field: 'user_name'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email_id'
  },
  createdDate: {
    type: Sequelize.DATE,
    field: 'created_on'
  },
  updatedDate: {
    type: Sequelize.DATE,
    field: 'last_updated_on'
  }
}, { sequelize: db.connection, modelName: 'userDetails', tableName: 'user_details'});

module.exports = Login;

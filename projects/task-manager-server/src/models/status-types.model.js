const db = require('../helpers/database-helper');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class StatusTypes extends Model {}

StatusTypes.init(
  {
    statusId: {
      type: Sequelize.INTEGER,
      field: 'status_id'
    },
    name: {
      type: Sequelize.STRING,
      field: 'status_name'
    },
    value: {
      type: Sequelize.STRING,
      field: 'status_value'
    }
  },
  {
    sequelize: db.connection,
    modelName: 'statusTypes',
    tableName: 'status_types'
  }
);

module.exports = StatusTypes;

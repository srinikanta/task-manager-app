const db = require('../helpers/database-helper');
const StatusTypesModel = require('../models/status-types.model');

class StatusService {
  async getStatusTypes() {
    const queryResponse = await StatusTypesModel.findAll({
      attributes: ['name', 'value']
    });
    const result = [];
    for (let index = 0; index < queryResponse.length; index++) {
      result.push(queryResponse[index].dataValues);
    }
    return result;
  }
}

module.exports = StatusService;

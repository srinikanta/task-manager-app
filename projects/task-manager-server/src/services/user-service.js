const db = require('../helpers/database-helper');
const UserModel = require('../models/user.model');

class UserService {
  async getUser(userName) {
    try {
      const queryResponse = await UserModel.findAll({
        where: {
          userName
        }
      });
      const result = [];
      for (let index = 0; index < queryResponse.length; index++) {
        result.push(queryResponse[index].dataValues);
      }
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getUsers() {
    const queryResponse = await UserModel.findAll();
    const result = [];
    for (let index = 0; index < queryResponse.length; index++) {
      result.push(queryResponse[index].dataValues);
    }
    return result;
  }

  async addUser(user) {
    try {
      const nextTaskId = await db.connection.query(
        `SELECT nextval('user_details_seq')`,
        { type: db.connection.QueryTypes.SELECT }
      );
      console.log(nextTaskId[0].nextval);
      const newUserId = nextTaskId[0].nextval;
      const userPayload = {
        userId: newUserId,
        userName: user.userName,
        email: user.email,
        creationDate: user.creationDate,
        updatedDate: user.creationDate
      };
      const created = await UserModel.findOrCreate({
        where: { userName: user.userName },
        defaults: userPayload
      });
      //const created = await UserModel.create(userPayload);
      return created;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = UserService;

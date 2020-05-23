const db = require('../helpers/database-helper');
const TasksModel = require('../models/tasks.model');
const config = require('config');

class TaskService {
  async getTasksByUserId(userId) {
    const result = [];

    try {
      const queryResponse = await TasksModel.findAll({
        where: {
          userId: userId
        },
        attributes: [
          'taskId',
          'title',
          'description',
          'status',
          'creationDate',
          'dueDate',
          'updatedOn'
        ]
      });

      for (let index = 0; index < queryResponse.length; index++) {
        result.push(queryResponse[index].dataValues);
      }

      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getTasks() {
    const result = [];

    try {
      const queryResponse = await TasksModel.findAll({
        attributes: [
          'taskId',
          'title',
          'description',
          'status',
          'creationDate',
          'dueDate',
          'updatedOn'
        ]
      });

      for (let index = 0; index < queryResponse.length; index++) {
        result.push(queryResponse[index].dataValues);
      }

      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async addTask(task) {
    //const sqlQuery = `INSERT INTO task VALUES(nextval('task_seq'), );`;
    //const values = [task.title];

    try {
      //await db.connection.query(`SELECT nextval('task_seq')`, values);
      //TasksModel.create({})

      const nextTaskId = await db.connection.query(
        `SELECT nextval('task_seq')`,
        { type: db.connection.QueryTypes.SELECT }
      );
      console.log(nextTaskId[0].nextval);
      const newTaskId = nextTaskId[0].nextval;
      const created = await TasksModel.create({
        taskId: newTaskId,
        title: task.title,
        description: task.description,
        userId: task.userId,
        creationDate: task.creationDate,
        updatedOn: task.creationDate,
        dueDate: task.dueDate,
        status: task.status
      });
      return created;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async updatedTask(task) {
    try {
      const queryResponse = await TasksModel.update(
        {
          description: task.description,
          status: task.status,
          dueDate: task.dueDate
        },
        {
          where: {
            taskId: parseInt(task.taskId)
          }
        }
      );
      return queryResponse;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async removeTask(taskId) {
    const removedTask = await TasksModel.destroy({
      where: {
        taskId: taskId
      }
    });
    return removedTask;
  }
}

module.exports = TaskService;

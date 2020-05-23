const getStatusTypes = require('./tasks/getStatusTypes');
const getTasks = require('./tasks/getTasks');
const getTasksByUserId = require('./tasks/getTasksByUserId');
const addTask = require('./tasks/addTask');
const deleteTask = require('./tasks/deleteTask');
const addSubTask = require('./tasks/addSubTask');
const getSubTask = require('./tasks/getSubTasks');
const getComments = require('./comments/getComments');
const addComment = require('./comments/addComment');
const updateTask = require('./tasks/updateTask');
const getUsers = require('./user/getUsers');
const getUser = require('./user/getUser');
const addUser = require('./user/addUser');
const rootPath = require('./rootPath');

module.exports = [
  getStatusTypes,
  getTasks,
  getTasksByUserId,
  addTask,
  deleteTask,
  addSubTask,
  getSubTask,
  getComments,
  addComment,
  updateTask,
  getUsers,
  getUser,
  addUser,
  rootPath
];

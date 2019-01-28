const { pick } = require('lodash');
const { TodoModel } = require('../models');

exports.create = async (userId, todoListId, values) =>
  TodoModel.create({
    ...pick(values, TodoModel.fillableProperties.create),
    todoListId,
    userId,
  });

exports.update = async (todoId, values) =>
  TodoModel.findByIdAndUpdate(
    todoId,
    pick(values, TodoModel.fillableProperties.update),
    { new: true },
  );

exports.delete = async todoId => TodoModel.deleteOne({ _id: todoId });
exports.findAllInList = async todoListId => TodoModel.find({ todoListId });

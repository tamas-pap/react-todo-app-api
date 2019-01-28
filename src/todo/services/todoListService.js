const { pick } = require('lodash');
const { TodoListModel, TodoModel } = require('../models');

exports.create = async (userId, values) =>
  TodoListModel.create({
    ...pick(values, TodoListModel.fillableProperties.create),
    userId,
  });

exports.update = async (todoListId, values) =>
  TodoListModel.findByIdAndUpdate(
    todoListId,
    pick(values, TodoListModel.fillableProperties.update),
    { new: true },
  );

exports.delete = async todoListId =>
  Promise.all([
    TodoListModel.deleteOne({ _id: todoListId }),
    TodoModel.deleteMany({ todoListId }),
  ]);

exports.findAllForUser = async userId => TodoListModel.find({ userId });

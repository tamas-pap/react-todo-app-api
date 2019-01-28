const { TodoListModel } = require('../models');

exports.canManage = ({ idProp = 'todoListId', from = 'params' } = {}) => async (
  req,
  res,
  next,
) => {
  const todoListId = req[from][idProp];
  const todoList =
    todoListId &&
    (await TodoListModel.findOne({ _id: todoListId, userId: req.userId }));

  if (!todoList) {
    res.status(403).json({ message: 'Access forbidden' });
    return;
  }

  next();
};

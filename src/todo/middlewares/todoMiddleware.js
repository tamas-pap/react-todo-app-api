const { TodoModel } = require('../models');

exports.canManage = ({ idProp = 'todoId', from = 'params' } = {}) => async (
  req,
  res,
  next,
) => {
  const todoId = req[from][idProp];
  const todo =
    todoId && (await TodoModel.findOne({ _id: todoId, userId: req.userId }));

  if (!todo) {
    res.status(403).json({ message: 'Access forbidden' });
    return;
  }

  next();
};

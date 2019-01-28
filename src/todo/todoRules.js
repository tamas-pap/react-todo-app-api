const { requestValidator } = require('../common/services');

const { body, param } = requestValidator;

const todoListIdRule = param('todoListId').isMongoId();
const todoIdRule = param('todoId').isMongoId();
const titleRule = body('title').isText();
const isCompletedRule = body('isCompleted').isIn([true, false]);

module.exports = {
  createTodoList: [titleRule],
  updateTodoList: [todoListIdRule, titleRule],
  deleteTodoList: [todoListIdRule],
  createTodo: [todoListIdRule, titleRule, isCompletedRule],
  updateTodo: [todoIdRule, titleRule, isCompletedRule],
  deleteTodo: [todoIdRule],
};

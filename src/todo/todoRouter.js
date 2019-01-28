const express = require('express');
const {
  asyncMiddleware,
  validatorMiddleware,
} = require('../common/middlewares');
const { authMiddleware } = require('../account/middlewares');
const { todoListMiddleware, todoMiddleware } = require('./middlewares');
const todoRules = require('./todoRules');
const todoController = require('./todoController');

const router = express.Router();

router.post(
  '/todo-lists',
  authMiddleware,
  todoRules.createTodoList,
  validatorMiddleware,
  asyncMiddleware(todoController.createTodoList),
);

router.put(
  '/todo-lists/:todoListId',
  authMiddleware,
  todoRules.updateTodoList,
  validatorMiddleware,
  todoListMiddleware.canManage(),
  asyncMiddleware(todoController.updateTodoList),
);

router.delete(
  '/todo-lists/:todoListId',
  authMiddleware,
  todoRules.deleteTodoList,
  validatorMiddleware,
  todoListMiddleware.canManage(),
  asyncMiddleware(todoController.deleteTodoList),
);

router.get(
  '/todo-lists',
  authMiddleware,
  asyncMiddleware(todoController.findAllTodoListsForUser),
);

router.post(
  '/todo-lists/:todoListId/todos',
  authMiddleware,
  todoRules.createTodo,
  validatorMiddleware,
  todoListMiddleware.canManage(),
  asyncMiddleware(todoController.createTodo),
);

router.put(
  '/todos/:todoId',
  authMiddleware,
  todoRules.updateTodo,
  validatorMiddleware,
  todoMiddleware.canManage(),
  asyncMiddleware(todoController.updateTodo),
);

router.delete(
  '/todos/:todoId',
  authMiddleware,
  todoMiddleware.canManage(),
  asyncMiddleware(todoController.deleteTodo),
);

router.get(
  '/todo-lists/:todoListId/todos',
  authMiddleware,
  todoListMiddleware.canManage(),
  asyncMiddleware(todoController.findAllTodosInList),
);

module.exports = router;

const { todoListService, todoService } = require('./services');

exports.createTodoList = async (req, res) => {
  const todoList = await todoListService.create(req.userId, req.body);
  res.json(todoList);
};

exports.updateTodoList = async (req, res) => {
  const todoList = await todoListService.update(
    req.params.todoListId,
    req.body,
  );

  res.json(todoList);
};

exports.deleteTodoList = async (req, res) => {
  await todoListService.delete(req.params.todoListId);
  res.json();
};

exports.findAllTodoListsForUser = async (req, res) => {
  const todoLists = await todoListService.findAllForUser(req.userId);
  res.json(todoLists);
};

exports.createTodo = async (req, res) => {
  const todo = await todoService.create(
    req.userId,
    req.params.todoListId,
    req.body,
  );

  res.json(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await todoService.update(req.params.todoId, req.body);
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  await todoService.delete(req.params.todoId);
  res.json();
};

exports.findAllTodosInList = async (req, res) => {
  const todos = await todoService.findAllInList(req.params.todoListId);
  res.json(todos);
};

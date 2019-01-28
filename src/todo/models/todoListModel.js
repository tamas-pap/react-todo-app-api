const { database } = require('../../common/services');

const { Schema } = database;

const TodoListSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    title: String,
  },
  {
    timestamps: true,
  },
);

TodoListSchema.statics.fillableProperties = {
  create: ['title'],
  update: ['title'],
};

const TodoListModel = database.model('todoList', TodoListSchema);

module.exports = TodoListModel;

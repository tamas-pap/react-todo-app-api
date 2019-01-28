const { database } = require('../../common/services');

const { Schema } = database;

const TodoSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    todoListId: Schema.Types.ObjectId,
    title: String,
    isCompleted: Boolean,
  },
  {
    timestamps: true,
  },
);

TodoSchema.statics.fillableProperties = {
  create: ['title', 'isCompleted'],
  update: ['title', 'isCompleted'],
};

const TodoModel = database.model('todo', TodoSchema);

module.exports = TodoModel;

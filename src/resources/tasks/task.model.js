const uuid = require('uuid').v4;

class Task {
  constructor({
    id = uuid(),
    title = 'New task',
    order = 0,
    description = 'New task',
    userId = "",
    boardId = "",
    columnId = ""
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    return task;
  }
}

module.exports = Task;

const uuid = require('uuid').v4;

class Board {
  constructor({
    id = uuid(),
    title = 'New board',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(col => ({ id: uuid(), ...col }));
  }

  static toResponse(board) {
    return board;
  }
}

module.exports = Board;

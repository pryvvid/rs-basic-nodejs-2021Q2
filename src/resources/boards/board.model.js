const uuid = require('uuid').v4;

/**
 * Class to create a board object
 */
class Board {
  /**
   * @param {Object} boardObject Object with properties 'id, title, columns'
   * @param {string} boardObject.id User's id
   * @param {string} boardObject.title User's name
   * @param {Array<Object>} boardObject.columns User's columns
   */
  constructor({
    id = uuid(),
    title = 'New board',
    columns = []
  } = {}) {
    /**
     * @property {string} id Board's id
     */
    this.id = id;
    /**
     * @property {string} title Board's title
     */
    this.title = title;
    /**
     * @property {Array<Object>} columns Board's columns
     */
    this.columns = columns.map(col => ({ id: uuid(), ...col }));
  }

  /**
   * @property {Function} toResponse Returns board object
   * @returns {Object}
   */
  static toResponse(board) {
    return board;
  }
}

module.exports = Board;

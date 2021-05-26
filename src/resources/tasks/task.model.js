const uuid = require('uuid').v4;

/**
 * Class to create a task object
 */
class Task {
  /**
   * 
   * @param {Object} taskObject Object with properties 'id, title, order, description, userId, boardId, columnId'
   * @param {string} taskObject.id Task's id
   * @param {string} taskObject.title Task's title
   * @param {number} taskObject.order Task's order
   * @param {string} taskObject.description Task's description
   * @param {string|null} taskObject.userId Task's userId
   * @param {string|null} taskObject.boardId Task's boardId
   * @param {string|null} taskObject.columnId Task's columnId
   */
  constructor({
    id = uuid(),
    title = 'New task',
    order = 0,
    description = 'New task',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    /**
     * @property {string} id Task's id
     */
    this.id = id;
    /**
     * @property {string} title Task's title
     */
    this.title = title;
    /**
     * @property {number} order Task's order
     */
    this.order = order;
    /**
     * @property {string} description Task's description
     */
    this.description = description;
    /**
     * @property {string|null} userId Task's userId
     */
    this.userId = userId;
    /**
     * @property {string|null} boardId Task's boardId
     */
    this.boardId = boardId;
    /**
     * @property {string|null} columnId Task's columnId
     */
    this.columnId = columnId;
  }

  /**
   * 
   * @property {Function} toResponse Returns task object
   * @returns {Object}
   */
  static toResponse(task) {
    return task;
  }
}

module.exports = Task;

const uuid = require('uuid').v4;

/**
 * Class to create a task object
 */
class Task {
  /**
   * @param {Object} task Object with properties 'id, title, order, description, userId, boardId, columnId'
   * @param {string} task.id Task's id
   * @param {string} task.title Task's title
   * @param {number} task.order Task's order
   * @param {string} task.description Task's description
   * @param {string|null} task.userId Task's userId
   * @param {string|null} task.boardId Task's boardId
   * @param {string|null} task.columnId Task's columnId
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
   * @property {Function} toResponse Returns task object
   * @returns {Object}
   */
  static toResponse(task) {
    return task;
  }
}

module.exports = Task;

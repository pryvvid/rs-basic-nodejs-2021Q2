const uuid = require('uuid').v4;

/**
 * Class to create a user object
 */
class User {
  /**
   * 
   * @param {Object} userObject Object with properties 'id, name, login, password'
   * @param {string} userObject.id User's id
   * @param {string} userObject.name User's name
   * @param {string} userObject.password User's password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    /**
     * @property {string} id User's id
     */
    this.id = id;
    /**
     * @property {string} name User's name
     */
    this.name = name;
    /**
     * @property {string} login User's login
     */
    this.login = login;
    /**
     * @property {string} password User's password
     */
    this.password = password;
  }

  /**
   * 
   * @property {Function} toResponse Returns user object without password property
   * @returns {Object}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;

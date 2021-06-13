import { v4 } from "uuid";

const uuid = v4;

interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

type UserToResponse = {
  id?: string,
  name: string,
  login: string
};

/**
 * @class
 * Class to create a user object
 */
class User implements IUser {
  /**
   * @param {Object} userObject Object with properties 'id, name, login, password'
   * @param {string} userObject.id User's id
   * @param {string} userObject.name User's name
   * @param {string} userObject.login User's login
   * @param {string} userObject.password User's password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {} as IUser) {
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

  id: string;

  name: string;

  login: string

  password: string;

  /**
   * @property {Function} toResponse Returns user object without password property
   * @returns {Object}
   */
  static toResponse(user: IUser): UserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User, IUser };

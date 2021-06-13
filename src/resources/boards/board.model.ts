import { v4 } from "uuid";

const uuid = v4;

interface IColumn {
  id?: string
}

interface IBoard {
  id?: string;
  title: string;
  columns: Array<IColumn>|[]
}

/**
 * @class
 * Class to create a board object
 */
class Board implements IBoard {
  /**
   * @param {Object} boardObject Object with properties 'id, title, columns'
   * @param {string} boardObject.id Board's id
   * @param {string} boardObject.title Board's name
   * @param {Array<Object>} boardObject.columns Board's columns
   */
  constructor({
    id = uuid(),
    title = 'New board',
    columns = []
  } = {} as IBoard) {
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

  id?: string | undefined;

  title: string;

  columns: Array<IColumn>|[];

  /**
   * @property {Function} toResponse Returns board object
   * @returns {Object} Board object
   */
  static toResponse(board: IBoard) {
    return board;
  }
}

export { Board, IBoard };

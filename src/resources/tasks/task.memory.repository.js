let taskDB = [];

const getAll = async () => {
  const DB = await taskDB;
  return DB;
};

const getOne = async (id) => {
  let task = null;
  try {
    task = await taskDB.find((t) => t.id === id);
  } catch (e) {
    process.stderr.write(e);
  }
  return task;
};

const createTask = async (task) => {
  await taskDB.push(task);
};

const updateTask = async (id, newTaskInfo) => {
  const taskIndex = await taskDB.findIndex((task) => task.id === id);
  const updatedTask = {
    ...taskDB[taskIndex],
    ...newTaskInfo,
  };
  taskDB[taskIndex] = updatedTask;
};

const deleteTask = async (id) => {
  taskDB = await taskDB.filter((task) => task.id !== id);
};

const deleteTasksByBoardId = async (boardId) => {
  taskDB = await taskDB.filter((task) => task.boardId !== boardId);
};

const setUserIdToNull = (userId) => {
  taskDB = taskDB.map((task) => {
    if (task.userId === userId) {
      return { ...task, userId: null };
    }
    return task;
  });
};

module.exports = {
  getAll,
  getOne,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  setUserIdToNull,
};

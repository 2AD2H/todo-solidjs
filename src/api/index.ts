import { TodoContextType } from "../TodoContext";
import { Task, TaskList } from "../types";

const api = import.meta.env.VITE_TODO_API ?? "";

let addTaskInc = 0;

export const addTask = (task: Task, ctx: TodoContextType) => {
  const { setTasks, taskIdsBeingAdded, tasks } = ctx;

  // We'll need to keep track of this new task to set the task ID
  // asynchronously, so we'll make a new copy of the task.
  const newTask = { ...task, id: Number.MAX_SAFE_INTEGER - addTaskInc };
  addTaskInc = (addTaskInc + 1) % Number.MAX_SAFE_INTEGER;

  // Add the temporary task to the list.
  setTasks([...tasks, newTask]);

  taskIdsBeingAdded[newTask.id] = true;

  // Simulate the API call to create the task.
  // TODO: Replace this with a real API call.
  new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    delete taskIdsBeingAdded[newTask.id];
    setTasks(
      (task) => task.id === newTask.id,
      "id",
      (_) => 12345
    );
  });
};

export const toggleTask = (task: Task, ctx: TodoContextType) => {
  const { setTasks } = ctx;

  // Optimistically update the task.
  setTasks(
    (needle) => needle.id === task.id,
    "isCompleted",
    (isCompleted) => !isCompleted
  );

  // TODO: Call the API to update the task.
};

export const renameTask = (
  taskId: number,
  newTaskName: string,
  ctx: TodoContextType
) => {
  const { setTasks } = ctx;

  // Optimistically update the task.
  setTasks(
    (needle) => needle.id === taskId,
    "name",
    (_) => newTaskName
  );

  // TODO: Call the API to update the task.
};

export const deleteTask = (taskId: number, ctx: TodoContextType) => {
  const { setTasks } = ctx;

  // Optimistically remove the task.
  setTasks((tasks) => tasks.filter((task) => task.id != taskId));

  // TODO: Call the API to delete the task.
};

export const changeTaskNote = (
  taskId: number,
  newNote: string,
  ctx: TodoContextType
) => {
  const { setTasks } = ctx;

  // Optimistically update the task.
  setTasks(
    (needle) => needle.id === taskId,
    "note",
    (_) => newNote
  );

  // TODO: Call the API to update the task.
};

export const getTaskLists = async (token: string): Promise<TaskList[]> => {
  const res = await fetch(`${api}/api/TaskLists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const newTaskList = async (token: string) => {
  let newTaskListName: string;
  const taskLists = await getTaskLists(token);
  for (let i = 1; ; i++) {
    newTaskListName = `Untitled list ${i}`;
    // If task list is not found, we can create it.
    if (!taskLists.find((taskList) => taskList.name === newTaskListName)) {
      break;
    }
  }
  await fetch(`${api}/api/TaskLists`, {
    method: "POST",
    body: JSON.stringify({
      name: newTaskListName,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteTaskList = async (taskListId: number, token: string) => {
  await fetch(`${api}/api/TaskLists/${taskListId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTasks = async (
  taskListId: number,
  token: string
): Promise<Task[]> => {
  const res = await fetch(`${api}/api/Tasks/${taskListId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

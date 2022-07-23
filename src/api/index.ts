import { Auth0ContextType } from "../Auth0Context";
import { TodoContextType } from "../TodoContext";
import { Task, TaskList } from "../types";

const api = import.meta.env.VITE_TODO_API ?? "";

let addTaskInc = 0;

type ApiRequestContext = {
  todo: TodoContextType;
  auth: Auth0ContextType;
};

export const addTask = async (task: Task, ctx: ApiRequestContext) => {
  const { setTasks, taskIdsBeingAdded, tasks, taskListId } = ctx.todo;
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  // We'll need to keep track of this new task to set the task ID
  // asynchronously, so we'll make a new copy of the task.
  const newTask = { ...task, id: Number.MAX_SAFE_INTEGER - addTaskInc };
  addTaskInc = (addTaskInc + 1) % Number.MAX_SAFE_INTEGER;

  // Add the temporary task to the list.
  setTasks([...tasks, newTask]);

  taskIdsBeingAdded[newTask.id] = true;

  // Simulate the API call to create the task.
  const res = await fetch(
    taskListId() === null
      ? `${api}/api/Tasks`
      : `${api}/api/Tasks/${taskListId()}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );
  const newTaskFromApi: Task = await res.json();

  delete taskIdsBeingAdded[newTask.id];
  setTasks(
    (task) => task.id === newTask.id,
    "id",
    (_) => newTaskFromApi.id
  );
};

export const deleteTask = async (taskId: number, ctx: ApiRequestContext) => {
  const { setTasks } = ctx.todo;
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  // Optimistically remove the task.
  setTasks((tasks) => tasks.filter((task) => task.id != taskId));

  await fetch(`${api}/api/Tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = async (
  task: Partial<Task> & Pick<Task, "id">,
  ctx: ApiRequestContext
) => {
  const { setTasks } = ctx.todo;
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  setTasks(
    (needle) => needle.id === task.id,
    (_) => task
  );

  const { id, ...bodyObj } = task;
  await fetch(`${api}/api/Tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(bodyObj),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getTaskLists = async (
  ctx: ApiRequestContext
): Promise<TaskList[]> => {
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  const res = await fetch(`${api}/api/TaskLists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const newTaskList = async (ctx: ApiRequestContext) => {
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  let newTaskListName: string;
  const taskLists = ctx.todo.taskLists;
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

export const deleteTaskList = async (
  taskListId: number,
  ctx: ApiRequestContext
) => {
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  await fetch(`${api}/api/TaskLists/${taskListId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTasks = async (
  taskListId: number | null,
  ctx: ApiRequestContext
): Promise<Task[]> => {
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  const res = await fetch(
    taskListId ? `${api}/api/Tasks/${taskListId}` : `${api}/api/Tasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
};

export const getImportantTasks = async (
  ctx: ApiRequestContext
): Promise<Task[]> => {
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  const res = await fetch(`${api}/api/Tasks/Important`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const updateTaskList = async (
  taskList: Partial<TaskList> & Pick<TaskList, "id">,
  ctx: ApiRequestContext
) => {
  const { setTaskLists } = ctx.todo;
  const token = await ctx.auth.getToken();
  if (!token) throw new Error("No token");

  setTaskLists(
    (needle) => needle.id === taskList.id,
    (_) => taskList
  );

  const { id, ...bodyObj } = taskList;
  await fetch(`${api}/api/TaskLists/${taskList.id}`, {
    method: "PUT",
    body: JSON.stringify(bodyObj),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

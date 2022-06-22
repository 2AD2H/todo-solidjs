import { TodoContextType } from "../TodoContext";
import { Task } from "../types";

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
    "isChecked",
    (isChecked) => !isChecked
  );

  // TODO: Call the API to update the task.
};

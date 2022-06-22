import { Task } from "./types";

export const placeholderTasks: { [taskListId in number | "null"]: Task[] } = {
  null: [
    {
      id: 20,
      name: "task 1",
    },
    {
      id: 21,
      name: "task 2",
    },
  ],
  1: [
    {
      id: 50,
      name: "lorem ipsum",
    },
    {
      id: 23,
      name: "hello world",
    },
  ],
  2: [],
  3: [
    {
      id: 100,
      name: "shopping due today",
    },
  ],
};

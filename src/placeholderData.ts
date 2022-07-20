import { Task } from "./types";

export const placeholderTasks: { [taskListId in number | "null"]: Task[] } = {
  null: [
    {
      id: 20,
      name: "task 1",
      isCompleted: false,
      note: "",
    },
    {
      id: 21,
      name: "task 2",
      isCompleted: true,
      note: "",
    },
  ],
  1: [
    {
      id: 50,
      name: "lorem ipsum",
      isCompleted: false,
      note: "",
    },
    {
      id: 23,
      name: "hello world",
      isCompleted: false,
      note: "",
    },
  ],
  2: [],
  3: [
    {
      id: 100,
      name: "shopping due today",
      isCompleted: false,
      note: "",
    },
  ],
};

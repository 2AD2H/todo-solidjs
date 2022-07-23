export type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
  note: string;
  listId: number | null;
  isImportant: boolean;
  dueDate: string | null;
  isInMyDay: boolean;
};

export type TaskList = {
  id: number;
  name: string;
  userId: string;
  groupId: string;
  taskCount: number;
};

export type TaskFilter = (task: Task) => boolean;

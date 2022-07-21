export type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
  note?: string;
  listId?: number | null;
  isImportant: boolean;
};

export type TaskList = {
  id: number;
  name: string;
  userId: string;
  groupId: string;
  taskCount: number;
};

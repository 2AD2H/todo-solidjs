export type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
  note: string;
};

export type TaskList = {
  id: number;
  name: string;
  userId: string;
  groupId: string;
  taskCount: number;
};

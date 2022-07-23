import {
  createContext,
  createMemo,
  createSignal,
  ParentComponent,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Task, TaskList } from "./types";

export const makeTodoContext = () => {
  const [taskLists, setTaskLists] = createStore<TaskList[]>([]);
  const [taskListId, setTaskListId] = createSignal<number | null>(null);
  const taskList = () =>
    taskLists.find((t) => t.id === taskListId()) ||
    ({
      id: null,
      name: "Tasks",
    } as const);
  const [tasks, setTasks] = createStore<Task[]>([]);

  const taskIdsBeingAdded: { [id: number]: boolean } = {};

  const [selectedTaskId, setSelectedTaskId] = createSignal<number | null>(null);
  const selectedTask = createMemo(() =>
    tasks.find((t) => t.id === selectedTaskId())
  );

  return {
    taskLists,
    setTaskLists,
    taskListId,
    setTaskListId,
    taskList,
    tasks,
    setTasks,
    taskIdsBeingAdded,
    selectedTaskId,
    setSelectedTaskId,
    selectedTask,
  };
};

export type TodoContextType = ReturnType<typeof makeTodoContext>;

const TodoContext = createContext<TodoContextType>();

export const TodoProvider: ParentComponent = (props) => {
  return (
    <TodoContext.Provider value={makeTodoContext()}>
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const todo = useContext(TodoContext);
  if (!todo) throw new Error("useTodo must be used within a TodoProvider");
  return todo;
};

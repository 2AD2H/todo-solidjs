import {
  createContext,
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

  return {
    taskLists,
    setTaskLists,
    taskListId,
    setTaskListId,
    taskList,
    tasks,
    setTasks,
    taskIdsBeingAdded,
  };
};

export type TodoContextType = ReturnType<typeof makeTodoContext>;

const TodoContext = createContext<TodoContextType>(makeTodoContext());

export const TodoProvider: ParentComponent = (props) => {
  return (
    <TodoContext.Provider value={makeTodoContext()}>
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);

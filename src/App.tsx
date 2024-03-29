import { Component, createEffect, Show } from "solid-js";
import { Portal } from "solid-js/web";
import {
  getImportantTasks,
  getMyDayTasks,
  getTaskLists,
  getTasks,
} from "./api";
import { useAuth0 } from "./Auth0Context";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar";
import TaskDetail from "./components/TaskDetail";
import TaskListContent from "./components/TaskListContent";
import { useTodo } from "./TodoContext";

const App: Component = () => {
  const todo = useTodo();
  const auth = useAuth0();

  createEffect(() => {
    if (!auth.isAuthenticated()) return;

    (async () => {
      todo.setTaskLists(await getTaskLists({ auth, todo }));
    })();
  });

  // Change tasks when task list changes
  createEffect(() => {
    if (!auth.isAuthenticated()) return;
    todo.setTasks([]);
    (async () => {
      // Handling filtered task lists
      if (todo.filteredTaskListId() !== null) {
        switch (todo.filteredTaskListId()) {
          case "important": {
            todo.setTasks(await getImportantTasks({ auth, todo }));
            break;
          }
          case "myday": {
            todo.setTasks(await getMyDayTasks({ auth, todo }));
            break;
          }
        }
        return;
      }

      // Normal task list handling
      todo.setTasks(await getTasks(todo.taskListId(), { auth, todo }));
    })();
  });

  return (
    <div class="flex h-screen w-screen bg-neutral-900">
      <Sidebar />
      <div class="flex-1 rounded-tl-md overflow-hidden flex">
        <div class="flex-1">
          <TaskListContent />
        </div>
        <Show when={todo.selectedTask()}>
          {(task) => <TaskDetail task={task} />}
        </Show>
      </div>
      <Portal>
        {/* Show loading when Auth0 is initializing. */}
        <Show when={!auth?.isInitialized()}>
          <Loading />
        </Show>
      </Portal>
    </div>
  );
};

export default App;

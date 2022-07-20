import { Component, createEffect, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { getTaskLists, getTasks } from "./api";
import { useAuth0 } from "./Auth0Context";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar";
import TaskDetail from "./components/TaskDetail";
import TaskListContent from "./components/TaskListContent";
import { placeholderTasks } from "./placeholderData";
import { useTodo } from "./TodoContext";

const App: Component = () => {
  const todo = useTodo();
  const auth = useAuth0();

  createEffect(() => {
    if (!auth?.isAuthenticated()) return;

    (async () => {
      todo?.setTaskLists(await getTaskLists((await auth.getToken()) ?? ""));
    })();
  });

  // Change tasks when task list changes
  createEffect(() => {
    if (!auth.isAuthenticated()) return;
    todo.setTasks([]);
    (async () => {
      const id = todo.taskListId();
      if (!id) return;
      todo.setTasks(await getTasks(id, (await auth.getToken()) ?? ""));
    })();
  });

  return (
    <div class="flex h-screen w-screen bg-neutral-900">
      <Sidebar />
      <div class="flex-1 rounded-tl-md overflow-hidden flex">
        <div class="flex-1">
          <TaskListContent />
        </div>
        <Show when={todo?.selectedTask()}>
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

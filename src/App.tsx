import { Component, createEffect, onMount, Show } from "solid-js";
import TaskListContent from "./components/TaskListContent";
import Sidebar from "./components/Sidebar";
import { placeholderTasks } from "./placeholderData";
import { useTodo } from "./TodoContext";
import TaskDetail from "./components/TaskDetail";
import { Portal } from "solid-js/web";
import Loading from "./components/Loading";
import { useAuth0 } from "./Auth0Context";

const App: Component = () => {
  const todo = useTodo();
  const auth = useAuth0();

  createEffect(() => {
    if (!auth?.isAuthenticated()) return;

    (async () => {
      todo?.setTaskLists([
        { id: 1, name: "Task List 1" },
        { id: 2, name: "Task List 2" },
        { id: 3, name: "Task List 3" },
      ]);
    })();
  });

  // Change tasks when task list changes
  createEffect(() => {
    if (!auth?.isAuthenticated()) return;
    todo?.setTasks(placeholderTasks[todo.taskListId() ?? "null"]);
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

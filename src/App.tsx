import { Component, createEffect, onMount, Show } from "solid-js";
import TaskListContent from "./components/TaskListContent";
import Sidebar from "./components/Sidebar";
import { placeholderTasks } from "./placeholderData";
import { useTodo } from "./TodoContext";
import TaskDetail from "./components/TaskDetail";

const App: Component = () => {
  const { setTaskLists, setTasks, taskListId, selectedTask } = useTodo();

  onMount(() => {
    (async () => {
      setTaskLists([
        { id: 1, name: "Task List 1" },
        { id: 2, name: "Task List 2" },
        { id: 3, name: "Task List 3" },
      ]);
    })();
  });

  // Change tasks when task list changes
  createEffect(() => {
    setTasks(placeholderTasks[taskListId() ?? "null"]);
  });

  return (
    <div class="flex h-screen w-screen bg-neutral-900">
      <Sidebar />
      <div class="flex-1 rounded-tl-md overflow-hidden flex">
        <div class="flex-1">
          <TaskListContent />
        </div>
        <Show when={selectedTask()}>
          {(task) => <TaskDetail task={task} />}
        </Show>
      </div>
    </div>
  );
};

export default App;

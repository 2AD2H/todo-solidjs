import { Component, createEffect, onMount } from "solid-js";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import { placeholderTasks } from "./placeholderData";
import { useTodo } from "./TodoContext";

const App: Component = () => {
  const { setTaskLists, setTasks, taskListId, tasks } = useTodo();

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
      <div class="flex-1 rounded-tl-md overflow-hidden">
        <Content />
      </div>
    </div>
  );
};

export default App;

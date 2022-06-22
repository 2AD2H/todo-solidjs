import { Component, onMount } from "solid-js";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import { useTodo } from "./TodoContext";

const App: Component = () => {
  const { setTaskLists } = useTodo();
  onMount(() => {
    (async () => {
      setTaskLists([
        { id: 1, name: "Task List 1" },
        { id: 2, name: "Task List 2" },
        { id: 3, name: "Task List 3" },
        { id: 4, name: "Task List 4" },
      ]);
    })();
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

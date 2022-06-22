import { Component, For, JSX } from "solid-js";
import { addTask } from "../api";
import { useTodo } from "../TodoContext";
import Task from "./Task";

const Content: Component = () => {
  const todo = useTodo();
  const { taskList, tasks } = todo;

  const handleInputCommit: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (
    e
  ) => {
    if (e.key !== "Enter" || e.currentTarget.value === "") return;
    addTask({ id: 0, name: e.currentTarget.value }, todo);
    e.currentTarget.value = "";
  };

  return () => (
    <div class="bg-neutral-900 h-full relative">
      <div class="absolute top-0 left-0 right-0 bg-neutral-900 bg-opacity-60 pt-8 px-10 pb-4">
        <h1 class="text-3xl font-medium text-indigo-400">{taskList().name}</h1>
      </div>

      <div class="w-full h-full pt-24 px-10 flex flex-col gap-1">
        <For each={tasks}>{(task) => <Task task={task} />}</For>
      </div>

      <div class="bg-neutral-900 absolute bottom-0 left-0 right-0 bg-opacity-60 px-10 pt-2 pb-10">
        <div class="w-full bg-neutral-700 h-14 flex items-center rounded-sm">
          <span class="px-3">➕</span>
          <input
            type="text"
            class="flex-1 bg-neutral-700 border-0 focus:ring-0 text-white p-0"
            placeholder="Add a task"
            onKeyUp={handleInputCommit}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;

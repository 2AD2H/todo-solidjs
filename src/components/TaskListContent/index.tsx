import { Component, createSignal, For, JSX, Show } from "solid-js";
import { addTask } from "../../api";
import { useAuth0 } from "../../Auth0Context";
import { useTodo } from "../../TodoContext";
import Task from "../Task";
import MenuDropdown from "./MenuDropdown";

const TaskListContent: Component = () => {
  const auth = useAuth0();
  const todo = useTodo();

  const uncheckedTasks = () => todo?.tasks.filter((task) => !task.isCompleted);
  const checkedTasks = () => todo?.tasks.filter((task) => task.isCompleted);
  const checkedTasksCount = () => checkedTasks()?.length;

  const [showCompleted, setShowCompleted] = createSignal<boolean>(true);
  const handleToggleShowCompleted = () => setShowCompleted((prev) => !prev);

  const handleInputCommit: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (
    e
  ) => {
    if (e.key !== "Enter" || e.currentTarget.value === "" || !todo) return;
    (async () => {
      addTask(
        { id: 0, name: e.currentTarget.value, isCompleted: false },
        {
          auth,
          todo,
        }
      );
    })();
    e.currentTarget.value = "";
  };

  // let menuRef: HTMLDivElement | undefined;
  const [showMenu, setShowMenu] = createSignal(false);

  return () => (
    <div class="bg-neutral-900 h-full relative text-white">
      <div class="absolute top-0 left-0 right-0 bg-neutral-900 bg-opacity-60 pt-8 px-10 pb-4 flex justify-between">
        <h1 class="text-3xl font-medium text-indigo-400">
          {todo?.taskList().name}
        </h1>
        <div class="relative">
          <button class="h-full" onClick={() => setShowMenu((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
          <Show when={showMenu()}>
            <MenuDropdown close={() => setShowMenu(false)} />
          </Show>
        </div>
      </div>

      <div class="w-full h-full pt-24 px-10 flex flex-col gap-1">
        <For each={uncheckedTasks()}>{(task) => <Task task={task} />}</For>

        <button
          class="text-white bg-neutral-700 py-1 px-2 self-start rounded-sm my-1 flex gap-3"
          onClick={handleToggleShowCompleted}
        >
          <span>{showCompleted() ? "⬇️" : "➡️"}</span>
          <span>Completed</span>
          <span>{checkedTasksCount}</span>
        </button>

        <Show when={showCompleted()}>
          <For each={checkedTasks()}>{(task) => <Task task={task} />}</For>
        </Show>
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

export default TaskListContent;

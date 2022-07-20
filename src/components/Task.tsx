import { Component, JSX } from "solid-js";
import { toggleTask } from "../api";
import { useAuth0 } from "../Auth0Context";
import { useTodo } from "../TodoContext";
import { Task as TaskType } from "../types";

type Props = {
  task: TaskType;
};

const Task: Component<Props> = (props) => {
  const todo = useTodo();
  const auth = useAuth0();

  let checkboxRef: HTMLInputElement | undefined = undefined;
  let favoriteRef: HTMLDivElement | undefined = undefined;

  const handleClickTask: JSX.EventHandler<HTMLDivElement, MouseEvent> = (e) => {
    if (e.target === checkboxRef || favoriteRef?.contains(e.target)) return;
    todo?.setSelectedTaskId((prev) => (prev === null ? props.task.id : null));
  };

  const handleToggleCheck: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
    if (!todo) return;
    e.stopPropagation();
    toggleTask(props.task, { todo, auth });
  };

  return (
    <div
      class="min-h-[3.5rem] w-full bg-neutral-700 flex px-4 py-2 gap-4 rounded-sm hover:bg-neutral-600"
      classList={{
        "bg-neutral-700": todo?.selectedTaskId() !== props.task.id,
        "bg-neutral-600": todo?.selectedTaskId() === props.task.id,
      }}
      onClick={handleClickTask}
    >
      <div class="h-10 flex items-center">
        <input
          ref={checkboxRef}
          type="checkbox"
          class="rounded-full"
          checked={props.task.isCompleted}
          onChange={handleToggleCheck}
        />
      </div>
      <div class="flex-1 flex items-center">
        <span
          class="cursor-default"
          classList={{
            "line-through": props.task.isCompleted,
            "text-white": !props.task.isCompleted,
            "text-neutral-400": props.task.isCompleted,
          }}
        >
          {props.task.name}
        </span>
      </div>
      <div ref={favoriteRef} class="h-10 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white hover:text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Task;

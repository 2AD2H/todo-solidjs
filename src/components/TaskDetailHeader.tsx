import { Component, JSX } from "solid-js";
import { renameTask, toggleTask } from "../api";
import { useTodo } from "../TodoContext";
import { Task as TaskType } from "../types";

type Props = {
  task: TaskType;
};

const TaskDetailHeader: Component<Props> = (props) => {
  const todo = useTodo();

  const handleClickTask = () => {
    todo?.setSelectedTaskId(props.task.id);
  };

  const handleToggleCheck: JSX.EventHandler<HTMLInputElement, Event> = () => {
    if (!todo) return;
    toggleTask(props.task, todo);
  };

  const handleInputCommit: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (
    e
  ) => {
    if (e.key !== "Enter" || e.currentTarget.value === "" || !todo) return;
    renameTask(props.task.id, e.currentTarget.value, todo);
    e.currentTarget.blur();
  };

  return (
    <div
      class="min-h-[3.5rem] w-full bg-neutral-700 flex px-4 py-2 gap-4 rounded-sm"
      onClick={handleClickTask}
    >
      <div class="h-12 flex items-center">
        <input
          type="checkbox"
          class="rounded-full"
          checked={props.task.isChecked}
          onChange={handleToggleCheck}
        />
      </div>
      <input
        type="text"
        class="bg-neutral-700 text-white cursor-text text-2xl border-0 flex-1 min-w-0 focus:ring-0"
        value={props.task.name}
        onKeyUp={handleInputCommit}
      />
      <div class="h-12 flex items-center">
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

export default TaskDetailHeader;

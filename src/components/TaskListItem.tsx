import { Component } from "solid-js";
import { useTodo } from "../TodoContext";

type Props = {
  taskListId: number | null;
  icon: string;
  title: string;
  selected: boolean;
};

const TaskListItem: Component<Props> = (props) => {
  const todo = useTodo();

  const handleClick = () => {
    todo?.setTaskListId(props.taskListId);
  };

  return (
    <div
      class="m-2 rounded-sm p-2 flex justify-between items-center text-white hover:bg-neutral-700 hover:bg-opacity-70 cursor-default"
      classList={{
        "bg-neutral-700": props.selected,
        "bg-opacity-70": props.selected,
      }}
      onClick={handleClick}
    >
      <div class="flex gap-3">
        <div class="">{props.icon}</div>
        <span>{props.title}</span>
      </div>
      <div class="rounded-full bg-neutral-800 flex justify-center items-center px-1 text-sm">
        <p class="leading-5">3</p>
      </div>
    </div>
  );
};

export default TaskListItem;

import { Component } from "solid-js";

type Props = {
  icon: string;
  text: string;
  onClick?: () => void;
};

const TaskDetailButton: Component<Props> = (props) => (
  <button
    class="min-h-[3.5rem] bg-neutral-700 text-neutral-300 flex items-center px-4 py-2 gap-4 rounded-sm hover:bg-neutral-600 cursor-default"
    onClick={props.onClick}
  >
    <span>{props.icon}</span>
    <span>{props.text}</span>
  </button>
);

export default TaskDetailButton;

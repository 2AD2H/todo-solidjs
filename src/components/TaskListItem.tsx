import { Component, Show } from "solid-js";
import { useTodo } from "../TodoContext";
import { TaskFilter } from "../types";

type Props = {
  taskListId: number | null;
  icon: string;
  title: string;
  selected: boolean;
  taskCount: number | null;

  filteredTaskListId?: string;
  filteredApiRoute?: string;
  taskFilter?: TaskFilter;
};

const TaskListItem: Component<Props> = (props) => {
  const todo = useTodo();

  const handleClick = () => {
    if (props.filteredTaskListId) {
      todo.setTaskListId(null);
      todo.setFilteredTaskListId(props.filteredTaskListId);
      todo.setFilteredTaskListName(props.title);
      if (props.taskFilter) {
        todo.setTaskFilter(() => props.taskFilter);
      }
      return;
    }
    todo.setTaskListId(props.taskListId);
    todo.setFilteredTaskListId(null);
    todo.setFilteredTaskListName(null);
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
      <Show when={props.taskCount !== null}>
        <div class="rounded-full bg-neutral-800 flex justify-center items-center px-1 text-sm">
          <p class="leading-5">{props.taskCount}</p>
        </div>
      </Show>
    </div>
  );
};

export default TaskListItem;

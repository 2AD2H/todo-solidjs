import { Component, For } from "solid-js";
import { useTodo } from "../TodoContext";
import TaskListItem from "./TaskListItem";

const Sidebar: Component = () => {
  const { taskLists, taskListId } = useTodo();

  return (
    <div class="bg-neutral-800 w-60 overflow-y-auto">
      <TaskListItem
        taskListId={null}
        icon="🏠"
        title="Tasks"
        selected={taskListId() === null}
      />

      <hr class="border-neutral-600 m-1" />

      <For each={taskLists}>
        {(needle) => (
          <TaskListItem
            taskListId={needle.id}
            icon="💠"
            title={needle.name}
            selected={taskListId() === needle.id}
          />
        )}
      </For>
    </div>
  );
};

export default Sidebar;

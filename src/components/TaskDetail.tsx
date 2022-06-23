import { Component } from "solid-js";
import { useTodo } from "../TodoContext";
import { Task as TaskType } from "../types";
import TaskDetailButton from "./TaskDetailButton";
import TaskDetailHeader from "./TaskDetailHeader";

type Props = {
  task: TaskType;
};

const TaskDetail: Component<Props> = (props) => {
  const { setSelectedTaskId } = useTodo();

  const handleClose = () => {
    setSelectedTaskId(null);
  };

  return (
    <div class="bg-neutral-800 max-w-[22rem] w-full flex flex-col p-3 gap-4">
      <button class="place-self-end" onClick={handleClose}>
        ❌
      </button>
      <TaskDetailHeader task={props.task} />

      <TaskDetailButton icon="☀️" text="Add to My Day" />
    </div>
  );
};

export default TaskDetail;

import { Component, JSX } from "solid-js";
import { changeTaskNote, deleteTask } from "../api";
import { useTodo } from "../TodoContext";
import { Task as TaskType } from "../types";
import TaskDetailButton from "./TaskDetailButton";
import TaskDetailHeader from "./TaskDetailHeader";

type Props = {
  task: TaskType;
};

const TaskDetail: Component<Props> = (props) => {
  const todo = useTodo();
  const { setSelectedTaskId } = todo;

  const handleClose = () => {
    setSelectedTaskId(null);
  };

  const handleDelete = () => {
    setSelectedTaskId(null);
    deleteTask(props.task.id, todo);
  };

  const handleNoteInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (
    e
  ) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleNoteInputCommit: JSX.EventHandler<
    HTMLTextAreaElement,
    FocusEvent
  > = (e) => {
    changeTaskNote(props.task.id, e.currentTarget.value, todo);
  };

  return (
    <div class="relative">
      <div class="absolute top-0 left-0 right-0 h-12 flex justify-end bg-neutral-800 px-2">
        <button class="" onClick={handleClose}>
          ❌
        </button>
      </div>
      <div class="bg-neutral-800 max-w-[22rem] w-full flex flex-col p-3 gap-4 pt-14 h-full">
        <TaskDetailHeader task={props.task} />
        <TaskDetailButton icon="☀️" text="Add to My Day" />
        <textarea
          class="bg-neutral-700 text-neutral-300 rounded-sm overflow-hidden resize-none border-none focus:ring-0"
          placeholder="Add note"
          onInput={handleNoteInput}
          onBlur={handleNoteInputCommit}
          value={props.task.note}
        />
      </div>
      <div class="absolute bottom-0 left-0 right-0 bg-neutral-800 h-14 flex justify-end px-2">
        <button class="" onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;

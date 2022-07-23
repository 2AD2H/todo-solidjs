import { Component, createEffect, JSX } from "solid-js";
import { deleteTask, updateTask } from "../api";
import { useAuth0 } from "../Auth0Context";
import { useTodo } from "../TodoContext";
import { Task as TaskType } from "../types";
import TaskDetailButton from "./TaskDetailButton";
import TaskDetailHeader from "./TaskDetailHeader";

type Props = {
  task: TaskType;
};

const TaskDetail: Component<Props> = (props) => {
  const todo = useTodo();
  const auth = useAuth0();

  const handleClose = () => {
    todo?.setSelectedTaskId(null);
  };

  const handleDelete = () => {
    if (!todo) return;
    todo.setSelectedTaskId(null);
    deleteTask(props.task.id, { todo, auth });
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
    if (!todo) return;
    updateTask(
      { id: props.task.id, note: e.currentTarget.value },
      { todo, auth }
    );
  };

  let dueDateInputRef: HTMLInputElement | undefined;
  const handleClickAddDueDate: JSX.EventHandler<
    HTMLButtonElement,
    MouseEvent
  > = (e) => {
    // @ts-ignore
    dueDateInputRef?.showPicker();
    e.preventDefault();
  };
  const handleDueDatePicked: JSX.EventHandler<HTMLInputElement, Event> = () => {
    const date = dueDateInputRef?.value ?? "";
    updateTask(
      { id: props.task.id, dueDate: date === "" ? null : date },
      { todo, auth }
    );
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

        <div class="flex flex-col relative">
          <button
            class="min-h-[3.5rem] bg-neutral-700 text-neutral-300 flex items-center px-4 py-2 gap-4 rounded-sm hover:bg-neutral-600 cursor-default"
            onClick={handleClickAddDueDate}
            classList={{
              "text-blue-500": props.task.dueDate !== null,
            }}
          >
            <span>📅</span>
            <span>
              {props.task.dueDate === null
                ? "Add due date"
                : `Due ${new Date(props.task.dueDate).toLocaleString()}`}
            </span>
          </button>

          <input
            type="datetime-local"
            ref={dueDateInputRef}
            class="invisible absolute"
            onChange={handleDueDatePicked}
            value={props.task.dueDate ?? ""}
          />
        </div>

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

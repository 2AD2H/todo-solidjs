import { Component, Show } from "solid-js";
import { deleteTaskList } from "../../api";
import { useAuth0 } from "../../Auth0Context";
import { useTodo } from "../../TodoContext";

const MenuDropdown: Component<{
  ref?: HTMLDivElement | undefined;
  close: () => void;
}> = (props) => {
  const auth = useAuth0();
  const todo = useTodo();

  const handleDelete = async () => {
    props.close();
    const id = todo.taskListId();
    if (!id) return;
    todo.setTaskListId(null);
    todo.setTaskLists((list) => list.filter((taskList) => taskList.id !== id));
    await deleteTaskList(id, (await auth.getToken()) ?? "");
  };

  return (
    <div
      ref={props.ref}
      class="absolute right-0 top-full border rounded-md p-2 bg-neutral-700 flex flex-col w-40"
    >
      <Show when={todo.taskListId() !== null}>
        <button class="text-red-500 text-left" onClick={handleDelete}>
          Delete List
        </button>
      </Show>
    </div>
  );
};

export default MenuDropdown;

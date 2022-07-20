import { Component, For, Match, Switch } from "solid-js";
import { getTaskLists, newTaskList } from "../api";
import { useAuth0 } from "../Auth0Context";
import { useTodo } from "../TodoContext";
import TaskListItem from "./TaskListItem";

const Sidebar: Component = () => {
  const todo = useTodo();
  const auth = useAuth0();

  const handleAddTaskList = async () => {
    await newTaskList({ auth, todo });
    todo.setTaskLists(await getTaskLists({ auth, todo }));
    // TODO: rename the new task list
  };

  return (
    <div class="flex flex-col bg-neutral-800 w-60 text-white">
      <div class="overflow-y-auto flex-1">
        <Switch>
          <Match when={auth.isInitialized() && auth.isAuthenticated()}>
            <p>Hello, {auth.user()!.name}</p>
            <button onClick={auth.logout}>Logout</button>
          </Match>
          <Match when={auth.isInitialized() && !auth.isAuthenticated()}>
            <button onClick={auth.loginWithRedirect}>Login</button>
          </Match>
          <Match when={!auth.isInitialized()}>
            <p>Please wait</p>
          </Match>
        </Switch>
        <TaskListItem
          taskListId={null}
          icon="🏠"
          title="Tasks"
          selected={todo.taskListId() === null}
        />

        <hr class="border-neutral-600 m-1" />

        <For each={todo.taskLists}>
          {(needle) => (
            <TaskListItem
              taskListId={needle.id}
              icon="💠"
              title={needle.name}
              selected={todo.taskListId() === needle.id}
            />
          )}
        </For>
      </div>

      <div>
        <div
          class="m-2 rounded-sm p-2 flex justify-between items-center text-white hover:bg-neutral-700 hover:bg-opacity-70 cursor-default"
          onClick={handleAddTaskList}
        >
          <div class="flex gap-3">
            <div class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span>New list</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

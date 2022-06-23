import { Component, For, Match, Switch } from "solid-js";
import { useAuth0 } from "../Auth0Context";
import { useTodo } from "../TodoContext";
import TaskListItem from "./TaskListItem";

const Sidebar: Component = () => {
  const todo = useTodo();
  const auth = useAuth0();

  return (
    <div class="bg-neutral-800 w-60 overflow-y-auto text-white">
      <Switch>
        <Match when={auth?.isInitialized() && auth.isAuthenticated()}>
          <p>Hello, {auth?.user()!.name}</p>
          <button onClick={auth?.logout}>Logout</button>
        </Match>
        <Match when={auth?.isInitialized() && !auth.isAuthenticated()}>
          <button onClick={auth?.loginWithRedirect}>Login</button>
        </Match>
        <Match when={!auth?.isInitialized()}>
          <p>Please wait</p>
        </Match>
      </Switch>
      <TaskListItem
        taskListId={null}
        icon="🏠"
        title="Tasks"
        selected={todo?.taskListId() === null}
      />

      <hr class="border-neutral-600 m-1" />

      <For each={todo?.taskLists}>
        {(needle) => (
          <TaskListItem
            taskListId={needle.id}
            icon="💠"
            title={needle.name}
            selected={todo?.taskListId() === needle.id}
          />
        )}
      </For>
    </div>
  );
};

export default Sidebar;

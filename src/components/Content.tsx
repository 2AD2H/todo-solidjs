import { Component } from "solid-js";
import { useTodo } from "../TodoContext";

const Content: Component = () => {
  const { taskList } = useTodo();
  return () => (
    <div class="bg-green-300 h-full p-10">
      <h1 class="text-3xl">{taskList().name}</h1>
    </div>
  );
};

export default Content;

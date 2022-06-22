/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { TodoProvider } from "./TodoContext";

render(
  () => (
    <TodoProvider>
      <App />
    </TodoProvider>
  ),
  document.getElementById("root") as HTMLElement
);

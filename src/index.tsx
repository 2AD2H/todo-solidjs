/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { TodoProvider } from "./TodoContext";
import { Auth0Provider } from "./Auth0Context";

render(
  () => (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      client_id={import.meta.env.VITE_AUTH0_CLIENT_ID}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE}
      redirect_uri={window.location.origin}
      logoutRedirectUri={window.location.origin}
    >
      <TodoProvider>
        <App />
      </TodoProvider>
    </Auth0Provider>
  ),
  document.getElementById("root") as HTMLElement
);

import createAuth0Client, {
  Auth0ClientOptions,
  RedirectLoginOptions,
  User,
} from "@auth0/auth0-spa-js";
import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  ParentComponent,
  useContext,
} from "solid-js";

type ProviderProps = {
  domain: Auth0ClientOptions["domain"];
  client_id: Auth0ClientOptions["client_id"];
  redirect_uri: Auth0ClientOptions["redirect_uri"];
  audience: Auth0ClientOptions["audience"];
  logoutRedirectUri: string;
};

const makeAuth0Context = (props: ProviderProps) => {
  const [auth0] = createResource(async () => {
    const auth0 = await createAuth0Client({
      domain: props.domain,
      client_id: props.client_id,
      redirect_uri: props.redirect_uri,
      audience: props.audience,
    });

    return auth0;
  });

  const loginWithRedirect = (options?: RedirectLoginOptions) => {
    auth0()?.loginWithRedirect({
      redirect_uri: props.redirect_uri,
      ...options,
    });
  };

  const logout = () => {
    auth0()?.logout({ returnTo: props.logoutRedirectUri });
  };

  /**
   * If the `user` is `undefined`, then the context has not initialized yet.
   * If the `user` is `null`, then the user is logged out.
   * If the `user` is `User`, then the user is logged in.
   */
  const [user, setUser] = createSignal<User | null | undefined>();

  createEffect(() => {
    const resolvedAuth0 = auth0();
    if (!resolvedAuth0) return;

    (async () => {
      const url = window.location.href;
      if (isRedirect(url)) {
        await resolvedAuth0.handleRedirectCallback(url);
        window.history.replaceState({}, "", props.redirect_uri);
      }
      setUser((await resolvedAuth0.getUser()) ?? null);
    })();
  });

  const getToken = async () => {
    const auth = auth0();
    if (!auth) return;
    return await auth.getTokenSilently();
  };

  const isInitialized = () => user() !== undefined;
  const isAuthenticated = () => !!user();

  return {
    auth0,
    loginWithRedirect,
    logout,
    user,
    getToken,
    isInitialized,
    isAuthenticated,
  };
};

type Auth0ContextType = ReturnType<typeof makeAuth0Context>;

const Auth0Context = createContext<Auth0ContextType>();

export const Auth0Provider: ParentComponent<ProviderProps> = (props) => {
  const ctx = makeAuth0Context(props);

  return (
    <Auth0Context.Provider value={ctx}>{props.children}</Auth0Context.Provider>
  );
};

export const useAuth0 = () => {
  const auth = useContext(Auth0Context);
  if (!auth) {
    throw new Error("useAuth0 must be used within an Auth0Provider");
  }
  return auth;
};

function isRedirect(url: string) {
  const [, query] = url.split("?");
  return query && query.includes("code=") && query.includes("state=");
}

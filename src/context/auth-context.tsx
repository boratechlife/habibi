import {
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  type Signal,
} from "@builder.io/qwik";
import { useStore, $, type QRL } from "@builder.io/qwik";

interface AuthContextType {
  user: any;
  setUser: QRL<(user: any) => void>;
}

export const AuthContext = createContextId<AuthContextType>("auth-context");

export const AuthProvider = component$((props: { children: any }) => {
  const authStore = useStore({
    user: null,
  });

  const setUser = $((user: any) => {
    authStore.user = user;
  });

  useContextProvider(AuthContext, { user: authStore.user, setUser });

  return (
    <>
      <Slot />
    </>
  );
});

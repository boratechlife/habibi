import { useNavigate } from "@builder.io/qwik-city";
import { $, useContext } from "@builder.io/qwik";
import { AuthContext } from "~/context/auth-context";

export function useHandleClick() {
  const navigate = useNavigate();
  const authStore = useContext(AuthContext);

  return $((route: string) => {
    if (authStore.user) {
      navigate(route);
    } else {
      console.log("User is not logged in.");
    }
  });
}

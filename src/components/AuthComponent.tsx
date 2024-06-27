import {
  component$,
  useSignal,
  useVisibleTask$,
  useContext,
} from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { AuthContext } from "~/context/auth-context";

export default component$(() => {
  const navigate = useNavigate();
  const showTersalin = useSignal<Boolean>(false);
  const isBankRetrieved = useSignal<Boolean>(false);
  const bank = useSignal(null);
  const loc = useLocation();

  const exclusions = ["/", "/register/", "/forgot-password/"];

  const authContext = useContext(AuthContext);

  useVisibleTask$(() => {
    const auth = localStorage.getItem("auth");

    const currentPath = loc.url.pathname;
    if (!auth && !exclusions.includes(currentPath)) {
      navigate("/login");
      return;
    }

    const parsedAuth = JSON.parse(auth);
    // authContext.setUser(parsedAuth);
    authContext.user = parsedAuth;
    console.log("authContext", authContext.user);
    // const url = import.meta.env.PUBLIC_QWIK_API_URL + `api/gemini/bank`;

    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${parsedAuth.token}`,
    //   },
    // })
    //   .then(async (response) => {
    //     const data = await response.json();
    //     bank.value = data;
    //     isBankRetrieved.value = true;
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //     isBankRetrieved.value = false;
    //   });
  });

  return <section></section>;
});

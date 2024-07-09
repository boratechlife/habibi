/* eslint-disable qwik/no-use-visible-task */
import { component$, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { AuthContext } from "~/context/auth-context";

export default component$(() => {
  const navigate = useNavigate();
  const loc = useLocation();

  const exclusions = ["/", "/register/", "/forgot-password/", "/test/"];

  const authContext = useContext(AuthContext);

  useVisibleTask$(() => {
    const checkAuthTimeout = () => {
      const auth = localStorage.getItem("auth");

      const currentPath = loc.url.pathname;
      if (!auth && !exclusions.includes(currentPath)) {
        navigate("/login");
        return;
      }
      console.log("Current path", currentPath);
      const parsedAuth = JSON.parse(auth!);
      // authContext.user = parsedAuth;

      const authTime = parsedAuth.time;

      const currentTime = new Date().getTime();
      const timeDifference =
        (currentTime - new Date(authTime).getTime()) / (1000 * 60); // Convert to minutes

      if (timeDifference > 20) {
        // Log the user out
        localStorage.removeItem("auth");
        navigate("/login");
      }
    };

    const auth = localStorage.getItem("auth");

    const currentPath = loc.url.pathname;
    if (!auth && !exclusions.includes(currentPath)) {
      navigate("/login");
      return;
    }

    const parsedAuth = JSON.parse(auth!);
    // authContext.setUser(parsedAuth);
    authContext.user = parsedAuth;
    let intervalId = null;
    if (authContext.user) {
      checkAuthTimeout();
      // Set interval to check every 2 seconds
      intervalId = setInterval(checkAuthTimeout, 2000);
    }
    if (intervalId) {
      return () => clearInterval(intervalId);
    }
  });

  return <section></section>;
});

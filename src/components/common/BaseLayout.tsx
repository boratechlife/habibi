import { Slot, component$ } from "@builder.io/qwik";
import Navbar, { type NavbarProps } from "./Navbar";
import { useLocation } from "@builder.io/qwik-city";
import { paths_to_show } from "~/utils/Main";

type Props = NavbarProps;
export default component$<Props>(({ autoLogoSize }) => {
  const loc = useLocation();

  return (
    <>
      {paths_to_show.includes(loc.url.pathname) && (
        <Navbar autoLogoSize={autoLogoSize} />
      )}
      <main>
        <Slot />
      </main>
    </>
  );
});

import { Slot, component$ } from "@builder.io/qwik";
import Navbar, { type NavbarProps } from "./Navbar";

type Props = NavbarProps;
export default component$<Props>(({ autoLogoSize }) => {
  return (
    <>
      <Navbar autoLogoSize={autoLogoSize} />
      <main>
        <Slot />
      </main>
    </>
  );
});

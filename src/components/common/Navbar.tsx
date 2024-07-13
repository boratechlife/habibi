import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import logoGif from "~/media/logos/logo.webp";

export type NavbarProps = {
  autoLogoSize?: boolean;
};

export default component$<NavbarProps>(({ autoLogoSize = false }) => {
  return (
    <header class="sticky left-0  top-0 z-10 w-full">
      <div class="backdrop-blur-sm lg:backdrop-blur-none">
        <div class="bg-habibi-darkGray relative flex border-b border-solid border-b-transparent">
          <div class="flex w-full justify-center p-2 px-5">
            <Link href="/">
              <img
                {...(autoLogoSize
                  ? { width: "250", height: "87" }
                  : { width: "200", height: "200" })}
                src={logoGif}
                alt="Discover"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});

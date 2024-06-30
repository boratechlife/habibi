import { component$ } from "@builder.io/qwik";

export const GameLauncher = component$(() => {
  // const store = useStore({
  //   game: null,
  //   showLauncherDialog: false,
  //   gameLaunchResult: { url: "", html: "" },
  //   open: false,
  //   gamePopUpWindowRef: null as Window | null,
  // });

  // const openGame = () => {
  //   if (gameLaunchResult.url !== "") {
  //     window.open(gameLaunchResult.url, "_blank");
  //   }
  // };
  //   const launchStore = useLaunchStore();

  //   const btnCloseDialog = useRef<HTMLButtonElement>(null);

  //   const openGame = $(() => {
  //     const OpenPopUp = () => {
  //       const y = window.outerHeight / 2 + window.screenY - 600 / 2;
  //       const x = window.outerWidth / 2 + window.screenX - 1024 / 2;
  //       const isAppMobile = /Mobi/.test(window.navigator.userAgent);
  //       let launchPopUp = false;
  //       switch (store.game.provider) {
  //         case "PRAG":
  //         case "SPD":
  //           launchPopUp = !isAppMobile;
  //           break;
  //         case "SBO":
  //         case "CMD":
  //         case "NEXUS4D":
  //         case "POKERQ":
  //         case "IPS":
  //         case "1X2":
  //         case "BBG":
  //         case "BTG":
  //         case "BPG":
  //         case "BNG":
  //         case "CQC":
  //         case "DS":
  //         case "ELK":
  //         case "EVP":
  //         case "FNG":
  //         case "FUG":
  //         case "GA":
  //         case "GFG":
  //         case "GZX":
  //         case "HAB":
  //         case "HAK":
  //         case "IDS":
  //         case "KGL":
  //         case "LL":
  //         case "MAV":
  //         case "MOB":
  //         case "NE":
  //         case "NGE":
  //         case "NLC":
  //         case "OT":
  //         case "OMI":
  //         case "PNG":
  //         case "PP":
  //         case "PRS":
  //         case "PUG":
  //         case "QS":
  //         case "RTG":
  //         case "RED":
  //         case "RLX":
  //         case "RLG":
  //         case "RG":
  //         case "SWC":
  //         case "SM":
  //         case "SHS":
  //         case "SPR":
  //         case "TK":
  //         case "TPG":
  //         case "WAZ":
  //         case "WOO":
  //         case "EBT":
  //         case "SWL":
  //         case "BTL":
  //         case "BTV":
  //         case "EZU":
  //         case "SAG":
  //         case "WMC":
  //         case "EBET":
  //         case "DGC":
  //         case "XGC":
  //         case "PTG":
  //         case "VIVO":
  //         case "SABA":
  //         case "EVLC":
  //         case "HUAY":
  //         case "JILI":
  //           launchPopUp = true;
  //           break;
  //         case "PGS":
  //         case "MPOKER":
  //         case "JKR":
  //         case "HABA":
  //           launchPopUp = false;
  //           break;
  //         default:
  //           launchPopUp = !isAppMobile;
  //           break;
  //       }

  //       if (store.gameLaunchResult.html) {
  //         store.gamePopUpWindowRef = window.open("about:blank", "PGS", "_parent");
  //         if (store.gamePopUpWindowRef) {
  //           store.gamePopUpWindowRef.focus();
  //           store.gamePopUpWindowRef.document.open();
  //           store.gamePopUpWindowRef.document.write(store.gameLaunchResult.url);
  //           store.gamePopUpWindowRef.document.close();
  //           store.gameLaunchResult.url = "";
  //           return;
  //         }
  //       }
  //       setTimeout(() => {
  //         if (launchPopUp) {
  //           store.gamePopUpWindowRef = window.open(
  //             store.gameLaunchResult.url,
  //             new Date().getTime().toString(),
  //             `width=1024,height=600,left=${x},top=${y}`,
  //           );
  //           try {
  //             if (store.gamePopUpWindowRef) store.gamePopUpWindowRef.focus();
  //           } catch (e) {
  //             setTimeout(() => {
  //               // openGame();
  //             }, 800);
  //             // alert(
  //             //   'Pop-up Blocker is enabled! Please disable your pop-up blocker. Or CLICK OPEN GAME',
  //             // )
  //           }
  //         } else {
  //           window.location.href = store.gameLaunchResult.url;
  //         }
  //       }, 500);
  //     };

  //     OpenPopUp();
  //   });

  //   useClientEffect$(() => {
  //     store.game = launchStore.state.game;
  //     store.showLauncherDialog = launchStore.state.showLauncherDialog;
  //     store.gameLaunchResult = launchStore.state.gameLaunchResult;

  //     if (store.showLauncherDialog) {
  //       store.open = true;
  //     } else {
  //       store.open = false;
  //     }
  //   });

  //   useClientEffect$(() => {
  //     if (store.gameLaunchResult.url !== "") {
  //       openGame();
  //     }
  //   }, [store.gameLaunchResult.url]);

  //   useClientEffect$(() => {
  //     if (store.gamePopUpWindowRef instanceof Window) {
  //       try {
  //         store.gamePopUpWindowRef.focus();
  //         setTimeout(() => {
  //           if (btnCloseDialog.current !== null) {
  //             btnCloseDialog.current.click();
  //           }
  //         }, 1000);
  //       } catch {
  //         // alert('Pop-up Blocker is enabled! Please disable your pop-up blocker. Or CLICK OPEN GAME');
  //       }
  //     }
  //   }, [store.gamePopUpWindowRef]);

  //   const closeGame = $(() => {
  //     launchStore.state.closeLauncherDialog();
  //     store.open = false;
  //   });

  return (
    <div
      class="relative z-10"
      id="headlessui-dialog-:r0:"
      role="dialog"
      aria-modal="true"
      data-headlessui-state="open"
      aria-labelledby="headlessui-dialog-title-:r2:"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 opacity-100 transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative translate-y-0 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left opacity-100 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs sm:scale-100 sm:p-6"
            id="headlessui-dialog-panel-:r1:"
            data-headlessui-state="open"
          >
            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <div class="0 mx-auto flex items-center justify-center">
                <img
                  src="https://assets.omdogede.xyz/images/thumbnail/KING/KM-TABLE-010.webp"
                  alt="Game Logo"
                  height={200}
                  width={150}
                />
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="headlessui-dialog-title-:r2:"
                  data-headlessui-state="open"
                >
                  belangkai 2
                </h3>
                <div class="mt-2">
                  <span>PROVIDER KING </span>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Click to Launch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

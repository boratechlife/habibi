import {
  component$,
  useContext,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import LobbyHeader from "~/components/LobbyHeader";
import { AuthContext } from "~/context/auth-context";

// const handleClick$ = $((_: any, direction: string) => {
//   const el = document.querySelector(".no-scrollbar") as HTMLElement;
//   if (direction == "right") {
//     el.scrollLeft += 50;
//   } else {
//     el.scrollLeft -= 50;
//   }
// });
export interface CategoryIconI {
  sports: (customClass: String) => JSX.Element;
  livecasino: (customClass: String) => JSX.Element;
  poker: (customClass: String) => JSX.Element;
  slot: (customClass: String) => JSX.Element;
  favorite: (customClass: String) => JSX.Element;
  arcade: (customClass: String) => JSX.Element;
  table: (customClass: String) => JSX.Element;
  fish: (customClass: String) => JSX.Element;
  lottery: (customClass: String) => JSX.Element;
}

export interface BalanceResponse {
  Result: "ACTIVE" | "PENDING" | "INACTIVE"; // Adjust the possible values based on actual usage
  AvailableCredit: number;
  newMember: number;
  promos: any[]; // Replace `any` with the appropriate type if known
  isValidate: number;
  pendingPintuDeposit: any | null; // Replace `any` with the appropriate type if known
  pendingPintuExpiry: any | null; // Replace `any` with the appropriate type if known
  pendingMinutes: number;
  isCrypto: boolean;
  isMaintenanceMode: boolean;
}
export type CategoryIconKeys = keyof CategoryIconI;

export default component$(() => {
  const navigate = useNavigate();
  const doraFrame = useSignal<HTMLIFrameElement | undefined>(undefined);
  const authStore = useStore<any>({
    user: null,
  });
  const baseUrl =
    import.meta.env.NEXT_PUBLIC_TOGEL_BASE_URL ||
    "https://doraemon.wirosablengonline.com";
  const mainParent = import.meta.env.NEXT_PUBLIC_MAIN_PARENT || "defaultParent";

  const authUser = useContext(AuthContext);
  // Construct the URL properly

  const balance = useStore<BalanceResponse | any>({});
  const state = useStore({ isBalanceRetrieved: false });

  useVisibleTask$(() => {
    const auth = localStorage.getItem("auth");
    const iframeSrc = `${baseUrl}?auth_key=${encodeURIComponent(authUser.user.token)}&agent=${encodeURIComponent(mainParent)}`;
    console.log("iframe", iframeSrc);

    if (!auth) {
      navigate("/login");
    }
    // Get the token
    // console.log(localStorage.getItem("auth"));

    authStore.user = JSON.parse(auth!);
    // console.log(authStore.user);

    try {
      const url = import.meta.env.PUBLIC_QWIK_API_URL + `api/gemini/balance`;
      const response = fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.user.token}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();

          if (data.Result) {
            balance.Result = data.Result; // Adjust the possible values based on actual usage
            balance.AvailableCredit = data.AvailableCredit;
            balance.newMember = data.newMember;
            balance.promos = data.promos; // Replace `any` with the appropriate type if known
            balance.isValidate = data.isValidate;
            balance.pendingPintuDeposit = data.pendingPintuDeposit; // Replace `any` with the appropriate type if known
            balance.pendingPintuExpiry = data.pendingPintuExpiry; // Replace `any` with the appropriate type if known
            balance.pendingMinutes = data.pendingMinutes;
            balance.isCrypto = data.isCrypto;
            balance.isMaintenanceMode = data.isMaintenanceMode;
            state.isBalanceRetrieved = true;
            console.log("Data", data);
          } else {
            console.log("message", data.message);
            state.isBalanceRetrieved = false;
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  });

  // Handle message events
  useVisibleTask$(({ cleanup }) => {
    const handleMessage = (e: MessageEvent) => {
      const frameRes = e.data.doraResponse;

      if (frameRes && doraFrame.value) {
        switch (frameRes.type) {
          case "iframeHeight":
            doraFrame.value.style.height = frameRes.height + "px";
            break;
          case "scrollTo":
            console.log("what is framres scrollTo", frameRes);
            window.scrollTo(frameRes.left, frameRes.top);
            break;
          case "requestAuth":
            console.log("must login!!!!!");
            document.location = "/login";
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener("message", handleMessage, false);

    cleanup(() => {
      window.removeEventListener("message", handleMessage, false);
    });
  });

  // Update iframe src when auth token changes
  useVisibleTask$(({ track }) => {
    track(() => authStore.user.token);
    if (doraFrame.value) {
      const iframeSrc = `${baseUrl}?auth_key=${encodeURIComponent(authUser.user.token)}&agent=${encodeURIComponent(mainParent)}`;
      console.log("iframe", iframeSrc);

      doraFrame.value.src = iframeSrc;
    }
  });

  return (
    <>
      <section>
        <div class="mt-16 h-full">
          <div class="bg-sky-900 py-3 pl-2 text-white accent-sky-100 ">
            <div class="border-b-2 border-solid border-white py-3 pl-2">
              <h1 class="text-2xl font-bold">
                {authStore.user && authStore.user.agentName}
              </h1>
              <div class="text-lg">
                Balance: <span class="font-bold">Rp. 0</span>
              </div>
            </div>
            <LobbyHeader />
            {authStore.user && (
              <iframe
                class="mt-2 h-full w-full rounded-md"
                src={`"https://doraemon.wirosablengonline.com/?auth_key=${authStore.user.token}&amp;agent=${authStore.user.agentName}"`}
                id="doraFrame"
                ref={doraFrame}
                scrolling="no"
                style="height: 200px;"
              ></iframe>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

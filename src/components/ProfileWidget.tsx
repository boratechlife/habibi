/* eslint-disable qwik/no-use-visible-task */
import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { useNavigate } from "@builder.io/qwik-city";
import { fetchBalance, fetchLogout } from "~/utils/Main";
import { type BalanceResponse } from "~/routes/lobby";

export default component$(() => {
  const authStore = useStore<any>({
    user: null,
  });
  const balance = useStore<BalanceResponse | any>({});

  const nav = useNavigate();

  useVisibleTask$(
    ({ cleanup }) => {
      const auth = localStorage.getItem("auth");
      authStore.user = JSON.parse(auth!);
      const link = new GraphQLWsLink(
        createClient({
          url: import.meta.env.PUBLIC_APPSYNC_HOST,
        }),
      );
      const apolloClient = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

      const subs = gql`
        subscription mySubscriptions {
          balanceByPlayer(username: "${authStore.user.userName}") {
            username
            balance
          }
        }
      `;
      const subs2 = gql`
        subscription broadcastSubscription {
          broadcastMessage(username: "${authStore.user.userName}") {
            username
            msg
          }
        }
      `;
      const apolloSubs = apolloClient
        .subscribe({
          query: subs,
        })
        .subscribe(async (data) => {
          console.log(JSON.stringify(data, null, 2));
          console.info("incoming balance req, check please", data);

          const result = await fetchBalance(authStore.user.token);

          if (result.success) {
            const balanceBody = result.data;
            balance.Result = balanceBody.Result;
            balance.AvailableCredit = balanceBody.AvailableCredit;
            balance.newMember = balanceBody.newMember;
            balance.promos = balanceBody.promos;
            balance.isValidate = balanceBody.isValidate;
            balance.pendingPintuDeposit = balanceBody.pendingPintuDeposit;
            balance.pendingPintuExpiry = balanceBody.pendingPintuExpiry;
            balance.pendingMinutes = balanceBody.pendingMinutes;
            balance.isCrypto = balanceBody.isCrypto;
            balance.isMaintenanceMode = balanceBody.isMaintenanceMode;
          } else {
            console.log("message", result.message);
          }
          // Assuming refreshBalance.submit() is a serializable function
        });

      const broadcastSubs = apolloClient
        .subscribe({
          query: subs2,
        })
        .subscribe(async (data) => {
          if (data.data.broadcastMessage.msg === "PG-DONE") {
            /* TODO: Show Dialog with message "Deposit anda berhasil" */

            nav("/lobby");
          } else if (data.data.broadcastMessage.msg === "PG-VOID") {
            /* TODO: Show Dialog with message "Order Deposit anda telah di batalkan, harap membuat order baru!" */
            //   toast.showToast("Transaksi telah di batalkan", "alert");
            nav("/lobby");
          } else if (data.data.broadcastMessage.msg === "LOGOUT") {
            //   authStore.KickMe();
            //   useNuxtApp().$awn.alert('duplicate login detected');
            const logoutResult = await fetchLogout(authStore.user.token);
            console.log("error", logoutResult.error);
            authStore.user = null;
            localStorage.removeItem("auth");
            document.location = "/";
          }
        });

      cleanup(() => {
        console.log("Cleanup");
        apolloSubs.unsubscribe();
        broadcastSubs.unsubscribe();
      });
    },
    { strategy: "document-ready" },
  );

  return (
    <div class="mt-16  px-2 py-3 text-white">
      <h1 class="text-2xl font-bold uppercase">
        {authStore.user && authStore.user.username}
      </h1>
      <div class="text-lg uppercase">
        Balance:
        <span class="ml-2 font-bold">
          {balance.AvailableCredit
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(balance.AvailableCredit)
            : new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(authStore.user?.AvailableCredit)}
        </span>
      </div>
    </div>
  );
});

// import he from "he";

// Interfaces
export interface PendingDepositI {
  err: number;
  trxId: string;
  accountId: string;
  type: string;
  status: string;
  amount: number;
  totAmount: number;
  feeAmount: number;
  trxDate: string;
  creditAmount: number;
  debitAmount: number;
  fees: Fee[];
  bankCode: string;
  channelId: string;
  channelName: string;
  address: string;
  addressName: string;
  refId: string;
}

export interface Fee {
  id: string;
  feename: string;
  feeamount: number;
}

export interface RegisterRequestI {
  userName: string;
  password: string;
  eMail: string;
  telephone: string;
  bank: string;
  bankName: string;
  bankAccount: string;
  referralCode: string;
}

export interface ForgotPasswordRequestI {
  userName: string;
  eMail: string;
}

interface AuthStore {
  auth: AuthI;
  balance: BalanceI;
  error: any;
  bank: BankI;
  profile: any;
}

export interface LoginRequestI {
  userName: string;
  password: string;
}

export interface DepositRequestI {
  amount: number;
  bank: string;
}

export interface WithdrawRequestI {
  amount: number;
}

export interface AuthI {
  userName: string;
  token: string;
  Result: string;
  AvailableCredit: number;
  CurrencyCode: string;
  TableLimit: string;
  agentName: string;
  isValidate: number;
  playerId: number;
}

interface BalanceI {
  Result: string;
  AvailableCredit: number;
  newMember: number;
  promos: any[];
  isValidate: number;
  pendingPintuDeposit: any;
  pendingPintuExpiry: any;
  pendingMinutes: number;
  isCrypto: boolean;
  isMaintenanceMode: boolean;
}

export interface BankDetailsI {
  body: {
    type: string;
    alias: string;
    refId: string;
    amount: number;
    address: string;
    remarks: string;
    bankCode: string;
    channelId: string;
    addressName: string;
  };
  fees: {
    id: string;
    feename: string;
    feeamount: number;
  }[];
  type: string;
  refId: string;
  trxId: string;
  amount: number;
  status: string;
  address: string;
  trxDate: string;
  bankCode: string;
  accountId: string;
  channelId: string;
  feeAmount: number;
  totAmount: number;
  addressName: string;
  channelName: string;
  debitAmount: number;
  creditAmount: number;
  wallet: boolean;
  checkout_url?: string;
  contentQris?: string;
  bank?: string;
  accountNo?: string;
}

export interface BankI {
  player: PlayerI;
  Operator: OperatorI;
  pendingMinutes: any;
  pendingDeposit: boolean;
  details?: BankDetailsI;
  pendingExpiry?: number;
}

interface PlayerI {
  bank: string;
  bankAccount: string;
  bankAccountName: string;
  name: string;
  isValidate: boolean;
  totalWithdraw: number;
}

export interface OperatorI {
  AutoBankAcc: boolean;
  banks: BankInfoI[];
  min: {
    bank: number;
    emoney: number;
    va: {
      Deposit: number;
      Withdraw: number;
    };
    qris: number;
  };
  payWithPg: number;
}

export interface BankInfoI {
  category: string;
  bankStatus: boolean;
  isShow: boolean;
  bankName: string;
  image: string;
  bankAccountName: string;
  bankAccountNo: string;
}

export interface GenericResponseI {
  err: number;
  err_message: string;
}

const initialState = {
  auth: {
    userName: "",
    token: "",
    Result: "",
    AvailableCredit: 0,
    CurrencyCode: "",
    TableLimit: "",
    agentName: "",
    isValidate: 0,
    playerId: 0,
  },
  balance: {
    Result: "PENDING",
    AvailableCredit: 0,
    newMember: 0,
    promos: [],
    isValidate: 0,
    pendingPintuDeposit: 0,
    pendingPintuExpiry: 0,
    pendingMinutes: 0,
    isCrypto: false,
    isMaintenanceMode: false,
  },
  error: {},
  bank: {
    player: {
      bank: "",
      bankAccount: "",
      bankAccountName: "",
      name: "",
      isValidate: false,
      totalWithdraw: 0,
    },
    Operator: {
      AutoBankAcc: false,
      banks: [
        {
          category: "",
          bankStatus: true,
          isShow: true,
          bankName: "",
          image: "",
          bankAccountName: "",
          bankAccountNo: "",
        },
      ],
      min: {
        bank: 0,
        emoney: 0,
        va: {
          Deposit: 0,
          Withdraw: 0,
        },
        qris: 0,
      },
      payWithPg: 1,
    },
    pendingMinutes: null,
    pendingDeposit: false,
  },
  profile: {},
};

// Qwik store

// const store = useStore<AuthStore>({
//   ...initialState,
// });

// useTask$(({ track }) => {
//   track(() => store.auth.token);
//   if (store.auth.token) {
//     // You can add additional logic here if needed when the token changes
//   }
// });

export const login = async (fields: LoginRequestI) => {
  return fetch("/api/gemini/login", {
    method: "POST",
    body: JSON.stringify(fields),
  })
    .then(async (res) => res.json())
    .then((data: AuthI | GenericResponseI) => {
      if ("token" in data) {
        store.auth = data;
      }
      return data;
    });
};

export const getBalance = async () => {
  return fetch("/api/gemini/balance", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error((await res.json()).message);
      }
    })
    .then((data) => {
      store.balance = data;
      return "success";
    })
    .catch((err: Error) => {
      return err.message;
    });
};

export const getToken = () => {
  return store.auth.token;
};

export const logout = async (url: string, token: string) => {
  return await fetch(url + "/api/gemini/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok;
  });
};

export const getBankInfo = async () => {
  await fetch("/api/gemini/bank", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error((await res.json()).message);
      }
    })
    .then((data) => {
      if (data.err >= 400) throw new Error(data);
      store.bank = data;
      return "success";
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deposit = async (fields: DepositRequestI) => {
  return await fetch("/api/gemini/deposit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
    body: JSON.stringify({
      ...fields,
      return_url: `${window.location.protocol}//${window.location.host}`,
    }),
  }).then(async (res) => res.json());
};

export const refreshBalance = async () => {
  return fetch("/api/gemini/balance", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error((await res.json()).message);
      }
    })
    .then((data) => {
      if (data.Result === "SUSPEND") throw "AccountSuspend";
      if (data.err === 500) {
        logout();
        throw "ERROR " + data.err_message;
      }
      if (data.isMaintenanceMode) {
        Object.assign(store, initialState);
        alert("Site under-maintenance!");
      }
      store.auth = {
        ...store.auth,
        ...data,
        LastUpdate: new Date().getTime(),
      };
      if (data.promos.length > 0 && !data.promos[0].meta_data.showAllGames) {
        // await navigateTo({name: 'PROMOTION-GAME'});
      }
      return true;
    })
    .catch((err: Error) => {
      console.error("refreshBalance error ", err);
      logout();
      return err.message;
    });
};

export const kickMe = async () => {
  return fetch("/api/gemini/kick", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
  }).then(() => {
    Object.assign(store, initialState);
    logout();
  });
};

export const register = async (fields: RegisterRequestI) => {
  fields.userName = fields.userName.toLowerCase().trim();
  fields.eMail = fields.eMail.toLowerCase().trim();
  return fetch("/api/gemini/register", {
    method: "POST",
    body: JSON.stringify(fields),
  }).then(async (res) => res.json());
};

export const forgotPassword = async (fields: ForgotPasswordRequestI) => {
  return fetch("/api/gemini/reset-password", {
    method: "POST",
    body: JSON.stringify({
      ...fields,
      hostName: window.location.hostname,
    }),
  }).then(async (res) => res.json());
};

export const withdraw = async (fields: WithdrawRequestI) => {
  return fetch("/api/gemini/withdraw", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
    body: JSON.stringify({
      ...fields,
      noBSC: !store.balance.isCrypto,
      payWithPg: Boolean(store.bank.Operator.payWithPg),
    }),
  }).then(async (res) => res.json());
};

//   return {
//     store,
//     login,
//     getBalance,
//     getToken,
//     logout,
//     getBankInfo,
//     deposit,
//     refreshBalance,
//     kickMe,
//     register,
//     forgotPassword,
//     withdraw,
//   };

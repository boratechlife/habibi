import type { UserRegister } from "~/routes/register";
import cryptojs from "crypto-js";

const bankTHB = [
  {
    label: "ธนาคารกสิกรไทย ( Kbank ) ",
    value: "K-BANK",
  },
  {
    label: "ธนาคารไทยพาณิชย์ ( SCB )",
    value: "SCB",
  },
  {
    label: "ธนาคารกรุงเทพ ( BBL )",
    value: "BBL",
  },
  {
    label: "ธนาคารกรุงไทย ( KTB )",
    value: "KTB",
  },
  {
    label: "ธนาคารกรุงศรีอยุธยา ( BAY )",
    value: "KRUNGSRI",
  },
  {
    label: "ธนาคารออมสิน ( GSB )",
    value: "GSB",
  },
  {
    label: "ธนาคารทหารไทยธนชาต ( TTB )",
    value: "TTB",
  },
  {
    label: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร(BAAC)",
    value: "BAAC",
  },
  // {
  //   label: 'TRUEMONEY',
  //   value: 'TRUEWALLET',
  // },
];

const bankIDR = [
  { label: "--------", value: "-" },
  {
    label: "Bank BCA",
    value: "BCA",
  },
  {
    label: "Bank Mandiri",
    value: "MANDIRI",
  },
  {
    label: "Bank BNI",
    value: "BNI",
  },
  {
    label: "Bank BRI",
    value: "BRI",
  },
  {
    label: "Bank CIMB",
    value: "CIMB",
  },
  {
    label: "Bank PERMATA",
    value: "PERMATA",
  },
  {
    label: "Bank PANIN",
    value: "PANIN",
  },
  {
    label: "LINK-AJA",
    value: "LINK-AJA",
  },
  {
    label: "OVO",
    value: "OVO",
  },
  {
    label: "GO-PAY",
    value: "GOPAY",
  },
  {
    label: "DANA",
    value: "DANA",
  },
];
const bankCrypto = [
  { label: "--------", value: "-" },
  { label: "BINANCE / TOKO CRYPTO", value: "BNB" },
  { label: "TRUSTWALLET / METAMASK", value: "TRUSTWALLET" },
  { label: "PINTU", value: "PINTU" },
];
interface CatKey {
  CatId: number;
  CatName: string;
}
type mappersT = { [key: number]: CatKey };
const mappers: mappersT = {
  0: {
    CatId: 99,
    CatName: "favorite",
  },
  1: {
    CatId: 60,
    CatName: "sports",
  },
  2: {
    CatId: 0,
    CatName: "slot",
  },
  3: {
    CatId: 70,
    CatName: "livecasino",
  },
  4: {
    CatId: 12,
    CatName: "lottery",
  },
  // 4: {
  // 	CatId: 100,
  // 	CatName: 'promotion',
  // },
  6: {
    CatId: 1,
    CatName: "table",
  },
  7: {
    CatId: 9,
    CatName: "arcade",
  },
  8: {
    CatId: 7,
    CatName: "fish",
  },
  9: {
    CatId: 80,
    CatName: "poker",
  },
};

const reverseMap = (val: string) => {
  let res = 0;
  Object.keys(mappers).map((key) => {
    Object.keys(mappers[parseInt(key)]).map((nk) => {
      if (val === (mappers[Number(key)] as any)[nk]) res = Number(key);
    });
  });
  return res || 0;
};

//
// const imagePlaceHolder = (w, h, hero) => {
//   if (hero) {
//     return "https://assets.cryptopalace888.xyz/operators/arc/hero/hero.webp";
//   }
//   return "https://assets.cryptopalace888.xyz/operators/arc/200.webp";
//   /* unComment this after the env online */
//   // if (hero) {
//   //   return (
//   //     import.meta.env.VITE_image_resize +
//   //     '?url=' +
//   //     import.meta.env.VITE_IMAGE_URL.replace('/images', '') +
//   //     '/operators/' +
//   //     import.meta.env.VITE_MAIN_PARENT +
//   //     '/hero/hero.webp?w=' +
//   //     w +
//   //     '&h=' +
//   //     h +
//   //     '&wp=1'
//   //   );
//   // }
//   // return (
//   //   import.meta.env.VITE_image_resize +
//   //   '?url=' +
//   //   import.meta.env.VITE_IMAGE_URL +
//   //   '/operators/' +
//   //   import.meta.env.VITE_MAIN_PARENT +
//   //   '/' +
//   //   import.meta.env.VITE_MAIN_PARENT +
//   //   '.webp?w=' +
//   //   w +
//   //   '&h=' +
//   //   h +
//   //   '&wp=1'
//   // );
// };

export const paths_to_show = ["/", "/login/", "/register/"];



// utils/fetchRegister.js

export const fetchRegister = async (formData: UserRegister) => {
  const body = {
    ...formData,
    password_confirm: formData.password,
    userName:formData.username,
    agentName: import.meta.env.PUBLIC_MAIN_PARENT,
    currency: import.meta.env.PUBLIC_REGISTER_CURRENCY,
    firstName: "-",
    lastName: "-",
    status: import.meta.env.PUBLIC_REGISTER_STATUS,
    tableLimit: import.meta.env.PUBLIC_REGISTER_TABLE_LIMIT,
  };

  console.log("request.json()", body);

  const hash = cryptojs
  .MD5(`${body.userName}${body.password}${body.agentName}REGIS`)
  .toString();

  console.log("Hash", hash)
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}user/v2/insert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-sig": hash,
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const registerBody = await response.json();

    if (registerBody.err === 500) {
      throw new Error(registerBody.err_message || "Registration failed");
    }

    if (
      registerBody.err === undefined &&
      registerBody.agentName !== import.meta.env.PUBLIC_MAIN_PARENT
    ) {
      throw new Error("You are not allowed to access from this site");
    }

    return {
      success: true,
      data: registerBody,
    };
  } catch (error:any) {
    console.error("Error during registration request:", error);
    return {
      success: false,
      error: error.message || "An error occurred during the registration process.",
    };
  }
};


// utils/fetchCheckAccountNo.js

export const fetchCheckAccountNo = async (accountNo: any) => {
  try {
    const response = await fetch(import.meta.env.PUBLIC_GRAPHQL_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{checkuserByAttr(agentName:"${import.meta.env.PUBLIC_MAIN_PARENT}",
          accountNo:"${accountNo}"){exist}}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const body = await response.json();
    return {
      success: true,
      data: body.data.checkuserByAttr,
    };
  } catch (error) {
    console.error("Error during account number check request:", error);
    return {
      success: false,
      error: "An error occurred during the account number check process.",
    };
  }
};


// utils/fetchCheckPhone.js

export const fetchCheckPhone = async (phoneNo: any) => {
  try {
    const response = await fetch(import.meta.env.PUBLIC_GRAPHQL_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{checkuserByAttr(agentName:"${import.meta.env.PUBLIC_MAIN_PARENT}",
          telephoneNo:"${phoneNo}"){exist}}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const body = await response.json();
    console.log("Body",body)
    return {
      success: true,
      data: body.data.checkuserByAttr,
    };
  } catch (error) {
    console.error("Error during phone check request:", error);
    return {
      success: false,
      error: "An error occurred during the phone check process.",
    };
  }
};



// utils/fetchLogin.js

export const fetchLogin = async (formData: { username: any; password: any; }, userIpAddress: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (import.meta.env.NEXT_PUBLIC_MAIN_PARENT) {
    headers.append("x-org", import.meta.env.NEXT_PUBLIC_MAIN_PARENT);
  }

  headers.append("x-clientip", userIpAddress || "127.0.0.1");

  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}user/login`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          userName: formData.username,
          password: formData.password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const loginBody = await response.json();
    return {
      success: true,
      loginBody,
    };
  } catch (error) {
    console.error("Error during login request:", error);
    return {
      success: false,
      error: "An error occurred during the login process.",
    };
  }
};


// utils/fetchBalance.js

export const fetchBalance = async (token: any) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}user/balance`, {
      method: "GET",
      headers,
    });

    const balanceBody = await response.json();

    if (balanceBody.err === 500) {
      throw new Error("Failed to retrieve balance");
    }

    return {
      success: true,
      data: balanceBody,
    };
  } catch (error:any) {
    console.error("Error fetching balance:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};


const formatMoney = (
  amount: number,
  decimalCount = 2,
  decimal = ".",
  thousands = ",",
): string => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    const i = parseInt(
      Math.abs(Number(amount) || 0).toFixed(decimalCount),
      10,
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - Number(i))
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log("formatMoney error", e);
    return "";
  }
};

const formatInputNumber = (n: string): string => {
  // format number 1000000 to 1,234,567

  // return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // return n.replace(/[^\d.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const parts = n.split(".");
  const v = parts[0].replace(/[^\d.]/g, ""),
    dec = parts[1];
  let ab = v.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  ab = dec !== undefined ? ab + "." + dec : ab;

  return ab;
};

const providers: { [key: string]: any } = {
  GNS: "GENESIS",
  R8: "RADI 8",
  PGS: "PGSOFT",
  PRAG: "PRAGMATIC",
  PRAGLIVE: "PRAGMATIC",
  PRAGLIVEX: "PRAGMATIC",
  PRAGVIRTU: "PRAGMATIC",
  PRAGCRASH: "PRAGMATIC",
  CMD: "CMD SPORTSBOOK",
  JKR: "JOKER",
  "1X2": "1X2 Gaming",
  BBG: "BB Games",
  BTG: "Big Time Gaming",
  BPG: "Blueprint Gaming",
  BNG: "Booongo",
  CQC: "CQ9 Casino",
  DS: "Dragoon Soft",
  ELK: "Elk Studios",
  EVP: "Evoplay",
  FNG: "Fantasma Games",
  FUG: "Fugaso",
  GA: "GAMEART",
  GFG: "Gamefish Global",
  GZX: "Gamzix",
  HAB: "Habanero",
  HAK: "Hacksaw Gaming",
  IDS: "Iron Dog Studio",
  KGL: "Kalamba Games",
  LL: "Lady Luck",
  MAV: "Maverick",
  MOB: "Mobilots",
  NE: "NetEnt",
  NGE: "NetGame Entertainment",
  NLC: "Nolimit City",
  OT: "OneTouch",
  OMI: "OMI Gaming",
  PNG: "Play'n GO",
  PP: "PlayPearls",
  PRS: "Print Studios",
  PUG: "Push Gaming",
  QS: "Quickspin",
  RTG: "RTG Slots",
  RED: "Red Tiger",
  RLX: "Relax Gaming",
  RLG: "Reloaded Gaming",
  RG: "Revolver Gaming",
  SWC: "Skywind Casino",
  SM: "Slotmill",
  SHS: "Spearhead Studios",
  SPR: "Splitrock Gaming",
  TK: "Thunderkick",
  TPG: "Triple PG",
  WAZ: "Wazdan",
  WOO: "Woohoo Games",
  AUX: "AvatarUX",
  SWF: "WINFAST",
  YGG: "YGGDRASIL",
  MNP: "MANNAPLAY",
  SPD: "SPADEGAMING",
  IPS: "PLAYSTAR",
  FACHAI: "FACHAI GAMING",
  SXY: "AE CASINO",
  JILI: "JILI",
  AWS: "AE SLOT",
  KING: "KINGMAKER",
  YESBINGO: "YESBINGO",
  SBO: "SBOBET",
  EBT: "Ebet CASINO",
  SWL: "Skywind CASINO",
  BTL: "BETER CASINO",
  BTV: "BetGames TV",
  EZU: "EZUGI CASINO",
  SAG: "SA GAMING",
  WMC: "WM CASINO",
  EBET: "eBET",
  DGC: "Dream GAMING",
  XGC: "Xtreme GAMING",
  PTG: "Pretty GAMING",
  VIVO: "VIVO CASINO",
  SABA: "SABA SPORTSBOOK",
  EVLC: "EVOLUTION",
  HUAY: "HUAY DRAGON",
  MPOKER: "Million Poker",
  NEXT: "NEXTSPIN",
  SPRIBE: "SPRIBE",
  HABA: "HABANERO",
  UGSPORT: "UG-SPORT",
  FASTSPIN: "FASTSPIN",
  JDB: "JDB",
  SPADE: "SPADEGAMING",
};

export {
  bankIDR,
  bankTHB,
  bankCrypto,
  mappers,
  reverseMap,
  formatMoney,
  formatInputNumber,
  providers,
};

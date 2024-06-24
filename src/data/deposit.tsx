export interface DepositStore {
  isStop: boolean;
  timerId: 0 | number; // Changed from NodeJS.Timeout to number for simplicity
  countDownTime: number;
  expectedAmount: number;
  bnbTokenWithdrawFees: object;
  startTimer: (refreshBalance: () => Promise<string | boolean>) => void;
  stopTimer: () => void;
  resetTimer: () => void;
  runCountDown: (refreshBalance: () => Promise<string | boolean>) => void;
  setCountdownTime: (time: number) => void;
}

export const initialState: DepositStore = {
  isStop: true,
  timerId: 0,
  countDownTime: 0,
  expectedAmount: 0,
  bnbTokenWithdrawFees: {},
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
  runCountDown: () => {},
  setCountdownTime: () => {},
};
export const store = initialState;

store.startTimer = (refreshBalance: () => Promise<string | boolean>) => {
  if (store.isStop) {
    store.resetTimer();
    store.isStop = false;
    store.timerId = setInterval(() => store.runCountDown(refreshBalance), 1000);
  }
};

store.stopTimer = () => {
  store.isStop = true;
  if (store.timerId) {
    clearInterval(store.timerId);
    store.countDownTime = 0;
    store.timerId = 0;
  }
};

store.resetTimer = () => {
  store.stopTimer();
};

store.runCountDown = (refreshBalance: () => Promise<string | boolean>) => {
  store.countDownTime -= 1;
  if (store.countDownTime % 10 === 0) {
    refreshBalance();
  }
  if (store.countDownTime === 0) {
    store.stopTimer();
  }
};

store.setCountdownTime = (time: number) => {
  store.countDownTime = time;
};

//   useTask$(({ track }) => {
//     track(() => store.countDownTime);
//     // Additional side effects or logic can be placed here
//   });

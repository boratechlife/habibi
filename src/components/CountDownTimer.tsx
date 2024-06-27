import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

interface CountdownTimerProps {
  minutes: number;
}

export const CountdownTimer = component$((props: CountdownTimerProps) => {
  const state = useStore({
    time: props.minutes * 60, // Initialize time with the given minutes
  });

  const isRunning = useSignal(false);
  const formattedTime = useSignal(`00:${props.minutes}:00`);

  useVisibleTask$(({ cleanup }) => {
    isRunning.value = true;

    const update = () => {
      if (state.time > 0) {
        state.time -= 1;
        const hours = Math.floor(state.time / 3600);
        const minutes = Math.floor((state.time % 3600) / 60);
        const seconds = state.time % 60;
        formattedTime.value = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      } else {
        clearInterval(id);
      }
    };

    const id = setInterval(update, 1000);
    cleanup(() => clearInterval(id));
  });

  return <div>{formattedTime}</div>;
});

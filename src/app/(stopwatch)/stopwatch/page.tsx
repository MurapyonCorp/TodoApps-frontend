"use client";
import { useCountUpTimers } from "@/hooks/useCountUpTimers";
import { Button } from "flowbite-react";

export default function Stopwatch() {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
    createCountUpTimer,
  } = useCountUpTimers();

  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="justify-center">
        <div className="text-center">
          <div className="text-8xl">
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </div>
          <p className="pb-3">{isRunning ? "Running" : "Not running"}</p>
          <div className="space-x-14">
            {!isRunning ? (
              <button onClick={start}>Start</button>
            ) : (
              <button onClick={pause}>Pause</button>
            )}
            <button
              onClick={() => {
                reset(
                  new Date(),
                  isRunning ? true : false
                ) as unknown as React.MouseEventHandler<HTMLButtonElement>;
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {!isRunning && (
        <div className="flex justify-center">
          <Button
            color={"failure"}
            onClick={() => {
              createCountUpTimer();
              reset(
                new Date(),
                isRunning ? true : false
              ) as unknown as React.MouseEventHandler<HTMLButtonElement>;
            }} // onClick内のイベントが複数ある場合、アロー関数のインライン関数としてcreateCountUpTimer()とする必要あり。
            disabled={
              hours === 0 && minutes === 0 && seconds === 0 ? true : false
            }
            label="2"
            className="w-1/2"
          >
            登録
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";
import Image from "next/image";
import { UI_DATA } from "@/constants/uidata";
import { ThemeSwitch } from "@/app/themeSwitch";
import { StopWatch } from "../StopWatch";
import { useCountUpTimers } from "@/hooks/useCountUpTimers";

export const Header = () => {
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
    <div className="static flex justify-center">
      <h1 className="font-bold text-3xl text-center">{UI_DATA.HOME_TITLE}</h1>
      <Image
        src={"/images/shisa.png"}
        alt={"shisa"}
        width={41}
        height={41}
        className="ml-4"
      />
      <div className="absolute left-20">
        <StopWatch
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          isRunning={isRunning}
          start={start}
          pause={pause}
          reset={reset}
          onClickRegister={createCountUpTimer}
        />
      </div>
      <div className="absolute right-20">
        <ThemeSwitch />
      </div>
    </div>
  );
};

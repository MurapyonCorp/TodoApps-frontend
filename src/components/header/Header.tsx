"use client";
import Image from "next/image";
import { UI_DATA } from "@/constants/uidata";
import { ThemeSwitch } from "@/app/themeSwitch";
import { StopWatch } from "../StopWatch";
import { useCountUpTimers } from "@/hooks/useCountUpTimers";

export const Header = () => {
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
      <div className="absolute right-20">
        <ThemeSwitch />
      </div>
    </div>
  );
};

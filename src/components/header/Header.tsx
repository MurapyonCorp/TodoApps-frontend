"use client";
import { UI_DATA } from "@/constants/uidata";
import { ThemeSwitch } from "@/app/themeSwitch";

export const Header = () => {
  return (
    <div className="static flex justify-center">
      <h1 className="font-bold text-3xl text-center">{UI_DATA.HOME_TITLE}</h1>
      <div className="max-lg:hidden absolute right-20">
        <ThemeSwitch />
      </div>
    </div>
  );
};

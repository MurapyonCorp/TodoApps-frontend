import Image from "next/image";
import { UI_DATA } from "@/constants/uidata";

export const Header = () => {
  return (
    <div className="flex justify-center">
      <h1 className="font-bold text-3xl text-center">
        {UI_DATA.HOME_TITLE}
      </h1>
      <Image
        src={"/images/shisa.png"}
        alt={"shisa"}
        width={41}
        height={41}
        className="ml-4"
      />
    </div>
  );
};

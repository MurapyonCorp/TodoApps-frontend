"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useConfirmGuard = (isTimerWorked: boolean) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    const handleClick = (event: MouseEvent) => {
      if (isTimerWorked) {
        if (
          !window.confirm(
            "時間を記録中です。画面を切り替えますか？\nタイマーの記録を登録せずに切り替えると計測した時間がリセットされます。"
          )
        ) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isTimerWorked) {
        event.preventDefault();
        return (event.returnValue = "");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // window.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // window.removeEventListener("click", handleClick, true);
    };
  }, [isTimerWorked, pathname, searchParams]);
};

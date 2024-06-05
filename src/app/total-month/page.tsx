"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRouter } from "next/navigation";
import { Card } from "flowbite-react";

export default function TotalMonth() {
  const router = useRouter();
  const backPage = () => {
    router.back();
  };
  return (
    <>
      <button
        type="button"
        onClick={backPage}
        className="absolute top-4 left-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-8"
        >
          <path
            fill-rule="evenodd"
            d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div className="relative h-full">
        <Card className="absolute w-[1200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto ">
          <FullCalendar
            plugins={[dayGridPlugin]}
            locale={"ja"}
            contentHeight={"auto"}
            dayCellContent={(arg) => arg.date.getDate()}
            businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
            dayHeaderClassNames={"bg-gray-300 dark:bg-gray-700"}
          />
        </Card>
      </div>
    </>
  );
}
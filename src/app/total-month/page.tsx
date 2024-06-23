"use client";
import { useRouter } from "next/navigation";
import { CalendarCard } from "@/components/CalendarCard";
import { useCountUpTimers } from "@/hooks/useCountUpTimers";

export default function TotalMonth() {
  const router = useRouter();
  const { countUpTimers, countUpId, updateTime } = useCountUpTimers();
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
      <CalendarCard countUpTimers={countUpTimers} countUpId={countUpId} updateTime={updateTime} />
    </>
  );
}

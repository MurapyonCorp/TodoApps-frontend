"use client";
import { useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  EventClickArg,
  EventInput,
  formatDate,
} from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Card, Modal } from "flowbite-react";
import { CountUpTimerModel } from "@/models/countUpTimers.model";
import { useTimeCalculation } from "@/hooks/useTimeCalculation";

type Props = {
  countUpTimers: CountUpTimerModel[];
  countUpId: string;
  updateTime: Function;
  editHours: number;
  editMinutes: number;
  editSeconds: number;
  clickUpdateEdit: boolean;
  deleteCountUpTimer: Function;
};

export const CalendarCard = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [getDateArg, setGetDateArg] = useState<string>("");
  const { totalOfADay, totalTimeCalculation } = useTimeCalculation();

  const {
    countUpTimers,
    countUpId,
    updateTime,
    editHours,
    editMinutes,
    editSeconds,
    clickUpdateEdit,
    deleteCountUpTimer,
  } = props;

  const events: EventInput[] = totalTimeCalculation.map((value) => ({
    title: `${value.totalHours}:${value.totalMinutes}:${value.surplusSeconds}`,
    start: value.date,
    end: value.date,
    color: "red",
  }));

  const getFormatDate = (date: Date) =>
    formatDate(date, {
      month: "long",
      year: "numeric",
      day: "numeric",
      locale: "ja",
    });

  const handleDateClick = useCallback((arg: DateClickArg) => {
    alert(getFormatDate(arg.date));
  }, []);

  const countUpTimerId = countUpTimers.find(
    (countUpTimer) => countUpTimer.id === countUpId
  );

  return (
    <div className="relative h-full">
      <Card className="absolute w-[1200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          locale={"ja"}
          height={"auto"}
          dayCellContent={(arg) => arg.date.getDate()}
          businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
          dayHeaderClassNames={"bg-gray-300 dark:bg-gray-700"}
          events={events}
          eventClick={(e: EventClickArg) => {
            setGetDateArg(e.event.startStr);
            // updateTime(e);
            setOpenModal(true);
          }}
          dateClick={handleDateClick}
          buttonText={{ today: "今日" }}
        />
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          size={"xl"}
          position={"center"}
        >
          <Modal.Header>Study time</Modal.Header>
          <Modal.Body>
            {totalOfADay(getDateArg).map((item) => (
              <div className="text-5xl text-center py-1">
                {clickUpdateEdit}
                <span>{item.time_hours}</span>:<span>{item.time_minutes}</span>:
                <span>{item.time_seconds}</span>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="justify-center space-x-14">
            <button className="flex gap-1 bg-gray-400 dark:bg-gray-600 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p>save</p>
            </button>
            <button
              className="flex gap-1 bg-red-400 text-red-800 dark:bg-red-500 p-2 rounded-lg"
              onClick={() => {
                deleteCountUpTimer(countUpTimerId);
                setOpenModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
              <p>delete</p>
            </button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

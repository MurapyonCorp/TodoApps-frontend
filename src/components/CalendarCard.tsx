"use client";
import { useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput, formatDate } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Card, Modal } from "flowbite-react";
import { CountUpTimerModel } from "@/models/countUpTimers.model";

type Props = {
  countUpTimers: CountUpTimerModel[];
  countUpId: string;
  updateTime: Function;
  editTime: string;
  deleteCountUpTimer: Function;
};

export const CalendarCard = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const { countUpTimers, countUpId, updateTime, editTime, deleteCountUpTimer } =
    props;

  const events:EventInput[] = countUpTimers.map((event) => ({
    id: event.id,
    title: event.total_amounts,
    start: event.target_date.startDate,
    end: event.target_date.endDate,
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
          eventClick={(e) => {
            updateTime(e);
            setOpenModal(true);
          }}
          dateClick={handleDateClick}
          buttonText={{ today: "今日" }}
        />
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          size={"md"}
          position={"center"}
        >
          <Modal.Header>Study time</Modal.Header>
          <Modal.Body>
            <div className="text-8xl text-center">{editTime}</div>
          </Modal.Body>
          <Modal.Footer className="justify-center space-x-14">
            <button className="bg-gray-400 dark:bg-gray-600 p-2 rounded-lg">
              save
            </button>
            <button
              className="bg-red-400 dark:bg-red-500 p-2 rounded-lg"
              onClick={() => {
                deleteCountUpTimer(countUpTimerId);
                setOpenModal(false);
              }}
            >
              delete
            </button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

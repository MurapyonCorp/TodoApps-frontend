"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card, Modal } from "flowbite-react";
import { CountUpTimerModel } from "@/models/countUpTimers.model";

type Props = {
  countUpTimers: CountUpTimerModel[];
  countUpId: string;
  updateTime: Function;
};

export const CalendarCard = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { countUpTimers, countUpId, updateTime } = props;

  return (
    <div className="relative h-full">
      {countUpTimers?.length <= 0 ? (
        <Card className="absolute w-[1200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto">
          <FullCalendar
            plugins={[dayGridPlugin]}
            locale={"ja"}
            height={"auto"}
            dayCellContent={(arg) => arg.date.getDate()}
            businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
            dayHeaderClassNames={"bg-gray-300 dark:bg-gray-700"}
          />
        </Card>
      ) : (
        <>
          {countUpTimers.map((countUpTimer) => (
            <Card className="absolute w-[1200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto">
              <FullCalendar
                plugins={[dayGridPlugin]}
                locale={"ja"}
                height={"auto"}
                dayCellContent={(arg) => arg.date.getDate()}
                businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
                dayHeaderClassNames={"bg-gray-300 dark:bg-gray-700"}
                events={[
                  {
                    title: countUpTimer.total_amounts,
                    start: countUpTimer.target_date.startDate,
                    end: countUpTimer.target_date.endDate,
                    color: "red",
                  },
                ]}
                eventClick={() => {
                  setOpenModal(true);
                  updateTime(countUpTimer);
                }}
              />
              <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                size={"md"}
                position={"center"}
              >
                <Modal.Header>Study time</Modal.Header>
                <Modal.Body>
                  <div className="text-8xl text-center">
                    {countUpTimer.id === countUpId &&
                      countUpTimer.total_amounts}
                  </div>
                </Modal.Body>
                <Modal.Footer className="justify-center space-x-14">
                  <button className="bg-gray-400 dark:bg-gray-600 p-2 rounded-lg">
                    save
                  </button>
                  <button className="bg-red-400 dark:bg-red-500 p-2 rounded-lg">
                    delete
                  </button>
                </Modal.Footer>
              </Modal>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

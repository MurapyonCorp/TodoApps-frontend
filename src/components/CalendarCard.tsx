"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  EventClickArg,
  EventInput,
  formatDate,
} from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Card, Modal } from "flowbite-react";
import { useTimeCalculation } from "@/hooks/useTimeCalculation";
import { EditDeleteButton } from "./atoms/EditDeleteButton";
import { InputNumber } from "./atoms/InputNumber";

type Props = {
  countUpId: string;
  updateTime: Function;
  editHours: number;
  editMinutes: number;
  editSeconds: number;
  setEditHours: Dispatch<SetStateAction<number>>;
  setEditMinutes: Dispatch<SetStateAction<number>>;
  setEditSeconds: Dispatch<SetStateAction<number>>;
  clickUpdateEdit: boolean;
  setClickUpdateEdit: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
  deleteCountUpTimer: Function;
};

type FormErrors = {
  [key: string]: string;
};

export const CalendarCard = (props: Props) => {
  const {
    countUpId,
    updateTime,
    editHours,
    editMinutes,
    editSeconds,
    setEditHours,
    setEditMinutes,
    setEditSeconds,
    clickUpdateEdit,
    setClickUpdateEdit,
    onClick,
    deleteCountUpTimer,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [getDateArg, setGetDateArg] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { totalOfADay, totalTimeCalculation } = useTimeCalculation();

  const handleChangeAmount = (value: number) => {
    setErrors({});
  };

  const handleInvalidAmount = (value: string) => {
    setErrors({
      amount: "数値を入力してください",
    });
  };

  const handleInvalidValue = (value: number) => {
    setErrors({
      message: "0~59の範囲で入力してください",
    });
  };

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
            setOpenModal(true);
            setClickUpdateEdit(false);
          }}
          dateClick={handleDateClick}
          buttonText={{ today: "今日" }}
        />
        <Modal
          show={openModal}
          onClose={() => {
            setErrors({});
            setOpenModal(false);
          }}
          size={"xl"}
          position={"center"}
        >
          <Modal.Header>Study time</Modal.Header>
          <Modal.Body>
            <ul>
              {totalOfADay(getDateArg).map((item) => (
                <>
                  {clickUpdateEdit && item.id === countUpId ? (
                    <>
                      <li
                        key={item.id}
                        className="flex justify-center py-2 text-5xl text-center"
                      >
                        <InputNumber
                          value={editHours}
                          onChange={handleChangeAmount}
                          onInvalidNumber={handleInvalidAmount}
                          minSecFlag={false}
                          onInvalidValue={handleInvalidValue}
                          className="w-1/3 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        />
                        <span>:</span>
                        <InputNumber
                          value={editMinutes}
                          onChange={handleChangeAmount}
                          onInvalidNumber={handleInvalidAmount}
                          minSecFlag={true}
                          onInvalidValue={handleInvalidValue}
                          className="w-1/6 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        />
                        <span>:</span>
                        <InputNumber
                          value={editSeconds}
                          onChange={handleChangeAmount}
                          onInvalidNumber={handleInvalidAmount}
                          minSecFlag={true}
                          onInvalidValue={handleInvalidValue}
                          className="w-1/6 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        />
                        <div className="flex space-x-4 ml-6">
                          <EditDeleteButton
                            onClick={onClick}
                            className="flex items-center rounded bg-gray-100 px-0.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                            disabled={
                              errors.amount || errors.message ? true : false
                            }
                            svgClassName="w-7 h-7"
                            path_dproperty="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          />
                          <EditDeleteButton
                            onClick={() => {
                              setClickUpdateEdit(false);
                              setErrors({});
                            }}
                            className="flex items-center rounded bg-red-100 px-0.5 py-0.5 text-xs font-medium text-red-800 hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                            svgClassName="w-7 h-7"
                            path_dproperty="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
                          />
                        </div>
                      </li>
                      {errors.amount && (
                        <p className="flex-wrap text-red-500">
                          {errors.amount}
                        </p>
                      )}
                      <p className="flex-wrap text-red-500">{errors.message}</p>
                    </>
                  ) : (
                    <li
                      key={item.id}
                      className="flex justify-center py-2 text-5xl text-center"
                    >
                      <div className="flex space-x-8">
                        <label>
                          <span>{item.time_hours}</span>:
                          <span>{item.time_minutes}</span>:
                          <span>{item.time_seconds}</span>
                        </label>
                        <div className="flex space-x-4">
                          <EditDeleteButton
                            onClick={() => updateTime(item)}
                            className="flex items-center rounded bg-gray-100 px-0.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                            svgClassName="w-7 h-7"
                            path_dproperty="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z"
                          />
                          <EditDeleteButton
                            onClick={() => deleteCountUpTimer(item)}
                            className="flex items-center rounded bg-red-100 px-0.5 py-0.5 text-xs font-medium text-red-800 hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                            svgClassName="w-7 h-7"
                            path_dproperty="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          />
                        </div>
                      </div>
                    </li>
                  )}
                </>
              ))}
            </ul>
          </Modal.Body>
        </Modal>
      </Card>
    </div>
  );
};

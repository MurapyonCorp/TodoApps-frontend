"use client";
import { Dispatch, SetStateAction, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Button, Card, Modal } from "flowbite-react";
import { EditDeleteButton } from "./atoms/EditDeleteButton";
import { InputNumber } from "./atoms/InputNumber";
import { CountUpTimerModel } from "@/models/countUpTimers.model";

type Props = {
  countUpTimers: CountUpTimerModel[];
  countUpId: string;
  hours: number;
  minutes: number;
  seconds: number;
  onClickRegistration: () => void;
  openRegistModal: boolean;
  createDate: string;
  createHours: number;
  createMinutes: number;
  createSeconds: number;
  setOpenRegistModal: Dispatch<SetStateAction<boolean>>;
  setCreateDate: Dispatch<SetStateAction<string>>;
  setCreateHours: Dispatch<SetStateAction<number>>;
  setCreateMinutes: Dispatch<SetStateAction<number>>;
  setCreateSeconds: Dispatch<SetStateAction<number>>;
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
    countUpTimers,
    countUpId,
    onClickRegistration,
    openRegistModal,
    createDate,
    createHours,
    createMinutes,
    createSeconds,
    setOpenRegistModal,
    setCreateDate,
    setCreateHours,
    setCreateMinutes,
    setCreateSeconds,
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
  const [hourErrors, setHourErrors] = useState<FormErrors>({});
  const [minuteErrors, setMinuteErrors] = useState<FormErrors>({});
  const [secondErrors, setSecondErrors] = useState<FormErrors>({});

  // countUpTimer配列の日付(startDate)をその日のみに限定した配列を新たに作成。
  const filterADay = countUpTimers.map((dateValue) =>
    countUpTimers.filter(
      (value) => value.target_date.startDate === dateValue.target_date.startDate
    )
  );

  // filterADay配列の重複要素を排除した新たな配列
  const aDayElementArray = Array.from(
    new Map(
      filterADay.map((unique) => [JSON.stringify(unique), unique])
    ).values()
  );

  // 登録している記録の日付を配列に格納
  const dateArray = Array.from(
    new Map(
      countUpTimers.map((pickup) => [
        pickup.target_date.startDate,
        pickup.target_date.startDate,
      ])
    ).values()
  );

  // 集計したい要素の取得(startDateが2024-09-20の要素を取得するなど)
  const totalOfADay = (date: string) => {
    return (
      aDayElementArray.find((element) =>
        element.find((data) => data.target_date.startDate === date)
      ) ?? []
    );
  };

  const totalTimeCalculation = dateArray.map((date) => {
    const totalHoursOfADay = totalOfADay(date)
      // 上記の配列の中から分の値を取り出して新たな配列を作成。
      .map((array) => {
        return array.time_hours;
      })
      // 配列内の全要素の合計値を返す。
      .reduce((total, element) => {
        return total + element;
      }, 0);

    const totalMinutesOfADay = totalOfADay(date)
      // 上記の配列の中から分の値を取り出して新たな配列を作成。
      .map((array) => {
        return array.time_minutes;
      })
      // 配列内の全要素の合計値を返す。
      .reduce((total, element) => {
        return total + element;
      }, 0);

    const totalSecondsOfADay = totalOfADay(date)
      .map((array) => {
        return array.time_seconds;
      })
      .reduce((total, element) => {
        return total + element;
      }, 0);

    // 分または秒の合計の余りを返す定数
    const surplusCalculation = (surplus: number) => {
      return surplus % 60;
    };

    // 分または秒の合計の繰り上げを返す定数
    const carryUpCalculation = (carryUp: number) => {
      return Math.floor(carryUp / 60);
    };

    const surplusSeconds = surplusCalculation(totalSecondsOfADay);

    const carryUpSeconds = carryUpCalculation(totalSecondsOfADay);

    const surplusMinutes = surplusCalculation(totalMinutesOfADay);

    const sumMinutes = surplusMinutes + carryUpSeconds;

    const carryUpMinutes = carryUpCalculation(sumMinutes);

    const totalMinutes = surplusCalculation(sumMinutes);

    const totalHours = totalHoursOfADay + carryUpMinutes;

    return { totalHours, totalMinutes, surplusSeconds, date };
  });

  const handleChangeHour = (value: number) => {
    setHourErrors({});
    setCreateHours(value);
    setEditHours(value);
  };

  const handleChangeMinute = (value: number) => {
    setMinuteErrors({});
    setCreateMinutes(value);
    setEditMinutes(value);
  };

  const handleChangeSecond = (value: number) => {
    setSecondErrors({});
    setCreateSeconds(value);
    setEditSeconds(value);
  };

  const handleInvalidHour = (value: string) => {
    setHourErrors({
      amount: "数値を入力してください",
    });
  };

  const handleInvalidMinute = (value: string) => {
    setMinuteErrors({
      amount: "数値を入力してください",
    });
  };

  const handleInvalidSecond = (value: string) => {
    setSecondErrors({
      amount: "数値を入力してください",
    });
  };

  const handleInvalidValueMinute = (value: number) => {
    setMinuteErrors({
      message: "0~59の範囲で入力してください",
    });
  };

  const handleInvalidValueSecond = (value: number) => {
    setSecondErrors({
      message: "0~59の範囲で入力してください",
    });
  };

  const events: EventInput[] = totalTimeCalculation.map((value) => ({
    title: `${value.totalHours}:${value.totalMinutes}:${value.surplusSeconds}`,
    start: value.date,
    end: value.date,
    color: "red",
  }));

  return (
    <div className="relative h-full">
      <Card className="absolute xl:w-[1200px] w-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 m-auto">
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
          dateClick={(e: DateClickArg) => {
            setCreateDate(e.dateStr);
            setOpenRegistModal(true);
          }}
          buttonText={{ today: "今日" }}
        />
        <Modal
          show={openRegistModal}
          onClose={() => {
            setHourErrors({});
            setMinuteErrors({});
            setSecondErrors({});
            setOpenRegistModal(false);
          }}
          size="lg"
          position="top-center"
        >
          <Modal.Header>Time Registration</Modal.Header>
          <Modal.Body>
            <p className="text-lg">{createDate}</p>
            <div className="flex justify-center py-2 text-5xl text-center">
              <InputNumber
                value={createHours}
                onChange={handleChangeHour}
                onInvalidNumber={handleInvalidHour}
                minSecFlag={false}
                onInvalidValue={() => {}}
                className="w-1/3 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              />
              <span className="px-2">:</span>
              <InputNumber
                value={createMinutes}
                onChange={handleChangeMinute}
                onInvalidNumber={handleInvalidMinute}
                minSecFlag={true}
                onInvalidValue={handleInvalidValueMinute}
                className="w-1/6 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              />
              <span className="px-2">:</span>
              <InputNumber
                value={createSeconds}
                onChange={handleChangeSecond}
                onInvalidNumber={handleInvalidSecond}
                minSecFlag={true}
                onInvalidValue={handleInvalidValueSecond}
                className="w-1/6 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              />
            </div>
            <p className="flex-wrap text-red-500">{hourErrors.amount}</p>
            <p className="flex-wrap text-red-500">{minuteErrors.amount}</p>
            <p className="flex-wrap text-red-500">{secondErrors.amount}</p>
            <p className="flex-wrap text-red-500">{minuteErrors.message}</p>
            <p className="flex-wrap text-red-500">{secondErrors.message}</p>
          </Modal.Body>
          <Modal.Footer className="justify-center">
            <Button
              color={"failure"}
              label="2"
              className="w-1/2"
              onClick={() => {
                onClickRegistration();
                setOpenRegistModal(false);
              }}
              disabled={
                Object.keys(hourErrors).length !== 0 ||
                Object.keys(minuteErrors).length !== 0 ||
                Object.keys(secondErrors).length !== 0 ||
                (createHours === 0 &&
                  createMinutes === 0 &&
                  createSeconds === 0)
                  ? true
                  : false
              }
            >
              登録
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={openModal}
          onClose={() => {
            setHourErrors({});
            setMinuteErrors({});
            setSecondErrors({});
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
                          onChange={handleChangeHour}
                          onInvalidNumber={handleInvalidHour}
                          minSecFlag={false}
                          onInvalidValue={() => {}}
                          className="w-1/3 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        />
                        <span className="px-2">:</span>
                        <InputNumber
                          value={editMinutes}
                          onChange={handleChangeMinute}
                          onInvalidNumber={handleInvalidMinute}
                          minSecFlag={true}
                          onInvalidValue={handleInvalidValueMinute}
                          className="w-1/6 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        />
                        <span className="px-2">:</span>
                        <InputNumber
                          value={editSeconds}
                          onChange={handleChangeSecond}
                          onInvalidNumber={handleInvalidSecond}
                          minSecFlag={true}
                          onInvalidValue={handleInvalidValueSecond}
                          className="w-1/6 py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                        />
                        <div className="flex space-x-4 ml-6">
                          <EditDeleteButton
                            onClick={onClick}
                            className="flex items-center rounded bg-gray-100 px-0.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                            disabled={
                              Object.keys(hourErrors).length !== 0 ||
                              Object.keys(minuteErrors).length !== 0 ||
                              Object.keys(secondErrors).length !== 0 ||
                              (editHours === 0 &&
                                editMinutes === 0 &&
                                editSeconds === 0)
                                ? true
                                : false
                            }
                            svgClassName="w-7 h-7"
                            path_dproperty="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          />
                          <EditDeleteButton
                            onClick={() => {
                              setClickUpdateEdit(false);
                              setHourErrors({});
                              setMinuteErrors({});
                              setSecondErrors({});
                            }}
                            className="flex items-center rounded bg-red-100 px-0.5 py-0.5 text-xs font-medium text-red-800 hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                            svgClassName="w-7 h-7"
                            path_dproperty="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
                          />
                        </div>
                      </li>
                      <p className="flex-wrap text-red-500">
                        {hourErrors.amount}
                      </p>
                      <p className="flex-wrap text-red-500">
                        {minuteErrors.amount}
                      </p>
                      <p className="flex-wrap text-red-500">
                        {secondErrors.amount}
                      </p>
                      <p className="flex-wrap text-red-500">
                        {minuteErrors.message}
                      </p>
                      <p className="flex-wrap text-red-500">
                        {secondErrors.message}
                      </p>
                    </>
                  ) : (
                    <li
                      key={item.id}
                      className="flex justify-center py-2 text-5xl text-center"
                    >
                      <div className="flex space-x-8">
                        <label>
                          <span>{item.time_hours}</span>
                          <span className="px-1">:</span>
                          <span>{item.time_minutes}</span>
                          <span className="px-1">:</span>
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

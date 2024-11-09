"use client";
import { useState, useEffect } from "react";
import { CountUpTimerModel } from "@/models/countUpTimers.model";
import { REQUEST_TIME_DATA } from "@/constants/requestdata";
import { useStopwatch } from "react-timer-hook";

export const useCountUpTimers = () => {
  const year = new Date().getFullYear();
  const month = `0${new Date().getMonth() + 1}`.slice(-2);
  const day = `0${new Date().getDate()}`.slice(-2);
  const [today, setToday] = useState({
    startDate: `${year}-${month}-${day}`,
    endDate: `${year}-${month}-${day}`,
  });
  const [countUpTimers, setCountUpTimers] = useState<CountUpTimerModel[]>([]);
  const [openRegistModal, setOpenRegistModal] = useState(false);
  const [createDate, setCreateDate] = useState<string>("");
  const [createHours, setCreateHours] = useState<number>(0);
  const [createMinutes, setCreateMinutes] = useState<number>(0);
  const [createSeconds, setCreateSeconds] = useState<number>(0);
  const [editHours, setEditHours] = useState<number>(0);
  const [editMinutes, setEditMinutes] = useState<number>(0);
  const [editSeconds, setEditSeconds] = useState<number>(0);
  const [countUpId, setCountUpId] = useState<string>("");
  const [clickUpdateEdit, setClickUpdateEdit] = useState<boolean>(false);
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch();

  useEffect(() => {
    readAllCountUpTimers();
  }, []);

  const openStopwatch = () => {
    open("./stopwatch", "stopwatch", "width=520,height=260");
  };

  const readAllCountUpTimers = async () => {
    const res = await fetch(REQUEST_TIME_DATA.COUNTUP_GET);
    const json = await res.json();
    setCountUpTimers(json);
  };

  const createCountUpTimer = async () => {
    if (countUpId === "") {
      await fetch(REQUEST_TIME_DATA.COUNTUP_POST, {
        method: "POST",
        body: JSON.stringify({
          target_date: today,
          time_hours: hours,
          time_minutes: minutes,
          time_seconds: seconds,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    readAllCountUpTimers();
    setCountUpId("");
    close();
  };

  const registrationCountUpTimer = async () => {
    if (countUpId === "") {
      await fetch(REQUEST_TIME_DATA.COUNTUP_POST, {
        method: "POST",
        body: JSON.stringify({
          target_date: { startDate: createDate, endDate: createDate },
          time_hours: createHours,
          time_minutes: createMinutes,
          time_seconds: createSeconds,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    readAllCountUpTimers();
    setCountUpId("");
    setCreateDate("");
    setCreateHours(0);
    setCreateMinutes(0);
    setCreateSeconds(0);
    setOpenRegistModal(false);
  };

  const updateCountUpTimer = async () => {
    // 編集内容が０時間０分０秒の場合は、returnする
    if (!editHours && !editMinutes && !editSeconds) return;
    await fetch(REQUEST_TIME_DATA.COUNTUP_PUT, {
      method: "PUT",
      body: JSON.stringify({
        id: countUpId,
        time_hours: editHours,
        time_minutes: editMinutes,
        time_seconds: editSeconds,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setClickUpdateEdit(false);
    readAllCountUpTimers();
    setEditHours(0);
    setEditMinutes(0);
    setEditSeconds(0);
    setCountUpId("");
  };

  const updateTime = (updateTime: CountUpTimerModel) => {
    setClickUpdateEdit(true);
    setEditHours(updateTime.time_hours);
    setEditMinutes(updateTime.time_minutes);
    setEditSeconds(updateTime.time_seconds);
    setCountUpId(updateTime.id);
  };

  const deleteCountUpTimer = async (deleteCountUpTimer: CountUpTimerModel) => {
    if (!deleteCountUpTimer) return;
    await fetch(REQUEST_TIME_DATA.COUNTUP_DELETE + deleteCountUpTimer.id, {
      method: "DELETE",
    });
    readAllCountUpTimers();
  };

  return {
    today,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
    countUpTimers,
    openRegistModal,
    createDate,
    createHours,
    createMinutes,
    createSeconds,
    editHours,
    editMinutes,
    editSeconds,
    countUpId,
    clickUpdateEdit,
    setToday,
    setCountUpTimers,
    setOpenRegistModal,
    setCreateDate,
    setCreateHours,
    setCreateMinutes,
    setCreateSeconds,
    setEditHours,
    setEditMinutes,
    setEditSeconds,
    setCountUpId,
    setClickUpdateEdit,
    readAllCountUpTimers,
    openStopwatch,
    createCountUpTimer,
    registrationCountUpTimer,
    updateCountUpTimer,
    updateTime,
    deleteCountUpTimer,
  };
};

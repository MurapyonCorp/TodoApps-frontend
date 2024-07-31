"use client";
import { useState, useEffect } from "react";
import { CountUpTimerModel } from "@/models/countUpTimers.model";
import { REQUEST_TIME_DATA } from "@/constants/requestdata";
import { useStopwatch } from "react-timer-hook";
import { EventClickArg } from "@fullcalendar/core/index.js";

export const useCountUpTimers = () => {
  const [countUpTimers, setCountUpTimers] = useState<CountUpTimerModel[]>([]);
  const [editTime, setEditTime] = useState<string>("");
  const [countUpId, setCountUpId] = useState<string>("");
  const [clickUpdateEdit, setClickUpdateEdit] = useState(false);
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch();

  const today =
    `${new Date().getFullYear()}-` +
    `0${new Date().getMonth() + 1}`.slice(-2) +
    `-` +
    `0${new Date().getDate()}`.slice(-2);

  useEffect(() => {
    readAllCountUpTimers();
  }, []);

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
          target_date: {
            startDate: today,
            endDate: today,
          },
          total_amounts: `${hours}:${minutes}:${seconds}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    readAllCountUpTimers();
    setCountUpId("");
  };

  const updateCountUpTimer = async () => {
    if (!editTime) return;
    await fetch(REQUEST_TIME_DATA.COUNTUP_PUT, {
      method: "PUT",
      body: JSON.stringify({
        id: countUpId,
        total_amounts: editTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setClickUpdateEdit(false);
    readAllCountUpTimers();
    setEditTime("");
    setCountUpId("");
  };

  const updateTime = (updateTime: EventClickArg) => {
    setClickUpdateEdit(true);
    setEditTime(updateTime.event.title);
    setCountUpId(updateTime.event.id);
  };

  const deleteCountUpTimer = async (deleteCountUpTimer: CountUpTimerModel) => {
    if (!deleteCountUpTimer) return;
    await fetch(
      REQUEST_TIME_DATA.COUNTUP_DELETE + deleteCountUpTimer.id,
      {
        method: "DELETE",
      }
    );
    readAllCountUpTimers();
  };

  return {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
    countUpTimers,
    editTime,
    countUpId,
    clickUpdateEdit,
    setCountUpTimers,
    setEditTime,
    setCountUpId,
    setClickUpdateEdit,
    createCountUpTimer,
    updateCountUpTimer,
    updateTime,
    deleteCountUpTimer,
  };
};

"use client";
import { useState, useEffect } from "react";
import { CountUpTimerModel } from "@/models/countUpTimers.model";
import { REQUEST_TIME_DATA } from "@/constants/requestdata";

export const useCountUpTimers = () => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [dates, setDates] = useState<CountUpTimerModel[]>([]);
  const [editTime, setEditTime] = useState<string>("");
  const [dateId, setDateId] = useState<string>("");
  const [clickUpdateEdit, setClickUpdateEdit] = useState(false);

  useEffect(() => {
    readAllCountUpTimers();
  }, []);

  const readAllCountUpTimers = async () => {
    const res = await fetch(REQUEST_TIME_DATA.TODO_GET);
    const json = await res.json();
    setDates(json);
  };

  const createCountUpTimer = async () => {
    if (!date) return;
    if (dateId === "") {
      await fetch(REQUEST_TIME_DATA.TODO_POST, {
        method: "POST",
        body: JSON.stringify({
          target_date: date,
          total_amounts: time,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    readAllCountUpTimers();
    setDate("");
    setDateId("");
  };

  const updateCountUpTimer = async () => {
    if (!editTime) return;
    await fetch(REQUEST_TIME_DATA.TODO_PUT, {
      method: "PUT",
      body: JSON.stringify({
        id: dateId,
        total_amounts: editTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setClickUpdateEdit(false);
    readAllCountUpTimers();
    setEditTime("");
    setDateId("");
  };

  const updateTime = (updateTime: CountUpTimerModel) => {
    setClickUpdateEdit(true);
    setEditTime(updateTime.total_month);
    setDateId(updateTime.id);
  };

  const deleteCountUpTimer = async (deleteCountUpTimer: CountUpTimerModel) => {
    if (!deleteCountUpTimer) return;
    await fetch(REQUEST_TIME_DATA.TODO_DELETE + deleteCountUpTimer.id, {
      method: "DELETE",
    });
    readAllCountUpTimers();
  };

  return {
    date,
    time,
    dates,
    editTime,
    dateId,
    clickUpdateEdit,
    setDate,
    setTime,
    setDates,
    setEditTime,
    setDateId,
    setClickUpdateEdit,
  };
};

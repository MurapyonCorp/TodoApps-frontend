"use client";
import { SetStateAction, useEffect, useState } from "react";

import { TodoModel, TodoStatus } from "@/models/todos.model";
import { REQUEST_DATA } from "@/constants/requestdata";

export const useTodos = () => {
  const year = new Date().getFullYear();
  const month = `0${new Date().getMonth() + 1}`.slice(-2);
  const day = `0${new Date().getDate()}`.slice(-2);
  const [date, setDate] = useState({
    startDate: `${year}-${month}-${day}`,
    endDate: `${year}-${month}-${day}`,
  });
  const [todo, setTodo] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [todoId, setTodoId] = useState<string>("");
  const [clickUpdateTitle, setClickUpdateTitle] = useState(false);

  useEffect(() => {
    readAllTodos();
  }, []);

  const handleDateChange = (
    newDate: SetStateAction<{ startDate: string; endDate: string }>
  ) => {
    console.log("newDate:", newDate);
    setDate(newDate);
  };

  const readAllTodos = async () => {
    const res = await fetch(REQUEST_DATA.TODO_GET);
    const json = await res.json();
    setTodos(json);
  };

  const createTodo = async () => {
    if (!todo) return;
    if (todoId === "") {
      await fetch(REQUEST_DATA.TODO_POST, {
        method: "POST",
        body: JSON.stringify({
          target_date: date,
          title: todo,
          status: TodoStatus.incomplete,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    readAllTodos();
    setTodo("");
    setTodoTitle("");
    setTodoId("");
  };

  const updateTodo = async () => {
    if (!todoTitle) return;
    await fetch(REQUEST_DATA.TODO_PUT, {
      method: "PUT",
      body: JSON.stringify({
        id: todoId,
        title: todoTitle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setClickUpdateTitle(false);
    readAllTodos();
    setTodoTitle("");
    setTodoId("");
  };

  const updateStatusTodo = async (updateTodo: TodoModel) => {
    const todoStatus =
      updateTodo.status == TodoStatus.incomplete
        ? TodoStatus.done
        : TodoStatus.incomplete;
    await fetch(REQUEST_DATA.TODO_PUT, {
      method: "PUT",
      body: JSON.stringify({
        id: updateTodo.id,
        status: todoStatus,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    readAllTodos();
  };

  const updateTitleTodo = (updateTodo: TodoModel) => {
    setClickUpdateTitle(true);
    setTodoTitle(updateTodo.title);
    setTodoId(updateTodo.id);
  };

  const deleteTodo = async (deleteTodo: TodoModel) => {
    if (!deleteTodo) return;
    await fetch(REQUEST_DATA.TODO_DELETE + deleteTodo.id, {
      method: "DELETE",
    });
    readAllTodos();
  };

  return {
    date,
    todo,
    todoTitle,
    setDate,
    setTodo,
    setTodoTitle,
    todos,
    setTodos,
    todoId,
    setTodoId,
    clickUpdateTitle,
    setClickUpdateTitle,
    handleDateChange,
    readAllTodos,
    createTodo,
    updateTodo,
    updateStatusTodo,
    updateTitleTodo,
    deleteTodo,
  };
};

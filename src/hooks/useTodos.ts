"use client";
import { useEffect, useState } from "react";

import { TodoModel, TodoStatus } from "@/models/todos.model";
import { REQUEST_DATA } from "@/constants/requestdata";

export const useTodos = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [todoId, setTodoId] = useState<string>("");

  useEffect(() => {
    readAllTodos();
  }, []);

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
          title: todo,
          status: TodoStatus.incomplete,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch(REQUEST_DATA.TODO_PUT, {
        method: "PUT",
        body: JSON.stringify({
          id: todoId,
          title: todo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    readAllTodos();
    setTodo("");
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
    setTodo(updateTodo.title);
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
    todo,
    setTodo,
    todos,
    setTodos,
    todoId,
    setTodoId,
    readAllTodos,
    createTodo,
    updateStatusTodo,
    updateTitleTodo,
    deleteTodo,
  };
};

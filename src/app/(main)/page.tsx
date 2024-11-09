"use client";
import { TodoInput } from "@/components/TodoInput";
import { TodoLists } from "@/components/TodoLists";
import { useTodos } from "@/hooks/useTodos";
import Link from "next/link";
import { Button } from "flowbite-react";
import { BsStopwatchFill } from "react-icons/bs";
import { TodoStatus } from "@/models/todos.model";
import { useCountUpTimers } from "@/hooks/useCountUpTimers";
import { FaBars, FaXmark } from "react-icons/fa6";
import { ThemeSwitch } from "../themeSwitch";

export default function Home() {
  const {
    date,
    todo,
    todoTitle,
    setTodo,
    setTodoTitle,
    todos,
    todoId,
    clickUpdateTitle,
    setClickUpdateTitle,
    handleDateChange,
    createTodo,
    updateTodo,
    updateStatusTodo,
    updateTitleTodo,
    deleteTodo,
  } = useTodos();

  const { openStopwatch } = useCountUpTimers();

  const changeNavbar = () => {
    const bars = document.getElementById("bars");
    const xmark = document.getElementById("xmark");
    const menu = document.getElementById("menu");

    bars?.classList.toggle("hidden");
    xmark?.classList.toggle("hidden");
    menu?.classList.toggle("translate-x-full");
  };

  // 三項演算子の処理部分が複数の場合、全体を()で囲む 例：(setIsTimerWorked(false), console.log("true"))

  return (
    <div className="lg:flex justify-center">
      <nav className="lg:hidden">
        <button
          id="button"
          type="button"
          className="fixed z-20 top-6 right-6"
          onClick={changeNavbar}
        >
          <FaBars id="bars" size={25} />
          <FaXmark id="xmark" size={25} className="hidden" />
        </button>
        <ul
          id="menu"
          className="z-10 fixed top-0 left-0 w-full translate-x-full text-center bg-red-200 dark:bg-red-400 font-bold"
        >
          <li className="flex justify-center p-3">
            <div className="mx-auto">
              <Button color={""} onClick={openStopwatch}>
                <BsStopwatchFill className="size-7" />
              </Button>
            </div>
            <div className="mx-auto">
              <ThemeSwitch />
            </div>
          </li>
          <li className="p-3">
            <div className="">
              <Link href={"./total-month"}>集計データ</Link>
            </div>
          </li>
        </ul>
      </nav>
      <div className="max-lg:hidden fixed top-2 left-20">
        <Button color={""} onClick={openStopwatch}>
          <BsStopwatchFill className="size-7" />
        </Button>
      </div>
      <div className="max-lg:hidden fixed top-20 2xl:right-[480px] xl:right-64 lg:right-16">
        <Link href={"./total-month"}>集計データ</Link>
      </div>
      <div className="xl:w-5/12 lg:w-2/3 py-5 space-y-7">
        <TodoInput
          date={date}
          todo={todo}
          clickUpdateTitle={clickUpdateTitle}
          handleDateChange={handleDateChange}
          setTodo={setTodo}
          onClick={createTodo}
        />
        <TodoLists
          listsAreaClassName={
            "rounded-md bg-gray-300 dark:bg-gray-600 min-h-48 py-3"
          }
          h1Text={"未完了"}
          date={date}
          choice={TodoStatus.incomplete}
          todoTitle={todoTitle}
          todoId={todoId}
          todos={todos}
          updateStatusTodo={updateStatusTodo}
          updateTitleTodo={updateTitleTodo}
          checked={false}
          labelClassName={
            "truncate font-medium text-gray-900 dark:text-gray-100"
          }
          clickUpdateTitle={clickUpdateTitle}
          setTodoTitle={setTodoTitle}
          onClick={updateTodo}
          setClickUpdateTitle={setClickUpdateTitle}
          deleteTodo={deleteTodo}
        />
        <TodoLists
          listsAreaClassName={
            "rounded-md bg-gray-400 dark:bg-gray-800 min-h-48 py-3"
          }
          h1Text={"完了済"}
          date={date}
          choice={TodoStatus.done}
          todoTitle={todoTitle}
          todoId={todoId}
          todos={todos}
          updateStatusTodo={updateStatusTodo}
          updateTitleTodo={updateTitleTodo}
          checked={true}
          labelClassName={
            "truncate font-medium text-gray-900 dark:text-gray-100 line-through"
          }
          clickUpdateTitle={clickUpdateTitle}
          setTodoTitle={setTodoTitle}
          onClick={updateTodo}
          setClickUpdateTitle={setClickUpdateTitle}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

"use client";
import { TodoInput } from "@/components/TodoInput";
import { TodoLists } from "@/components/TodoLists";
import { useTodos } from "@/hooks/useTodos";
import Link from "next/link";
import { Button } from "flowbite-react";
import { BsStopwatchFill } from "react-icons/bs";
import { TodoStatus } from "@/models/todos.model";

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

  const openStopwatch = () => {
    open("./stopwatch", "stopwatch", "width=520,height=260");
  };

  // 三項演算子の処理部分が複数の場合、全体を()で囲む 例：(setIsTimerWorked(false), console.log("true"))

  return (
    <div className="flex justify-center">
      <div className="absolute top-2 left-20">
        <Button color={""} onClick={openStopwatch}>
          <BsStopwatchFill className="size-7" />
        </Button>
      </div>
      <div className="w-1/3 py-5 space-y-7 relative">
        <TodoInput
          date={date}
          todo={todo}
          clickUpdateTitle={clickUpdateTitle}
          handleDateChange={handleDateChange}
          setTodo={setTodo}
          onClick={createTodo}
        />
        <Link href={"./total-month"} className="flex absolute top-0 -right-32">
          集計データ
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <TodoLists
          listsAreaClassName={"rounded-md bg-gray-300 dark:bg-gray-600 min-h-48 py-3"}
          h1Text={"未完了"}
          date={date}
          choice={TodoStatus.incomplete}
          todoTitle={todoTitle}
          todoId={todoId}
          todos={todos}
          updateStatusTodo={updateStatusTodo}
          updateTitleTodo={updateTitleTodo}
          checked={false}
          labelClassName={"truncate font-medium text-gray-900 dark:text-gray-100"}
          clickUpdateTitle={clickUpdateTitle}
          setTodoTitle={setTodoTitle}
          onClick={updateTodo}
          setClickUpdateTitle={setClickUpdateTitle}
          deleteTodo={deleteTodo}
        />
        <TodoLists
          listsAreaClassName={"rounded-md bg-gray-400 dark:bg-gray-800 min-h-48 py-3"}
          h1Text={"完了済"}
          date={date}
          choice={TodoStatus.done}
          todoTitle={todoTitle}
          todoId={todoId}
          todos={todos}
          updateStatusTodo={updateStatusTodo}
          updateTitleTodo={updateTitleTodo}
          checked={true}
          labelClassName={"truncate font-medium text-gray-900 dark:text-gray-100 line-through"}
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

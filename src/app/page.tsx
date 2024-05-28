"use client";
import { TodoInput } from "@/components/TodoInput";
import { DoneList } from "@/components/todoList/DoneList";
import { IncompleteList } from "@/components/todoList/IncompleteList";
import { useTodos } from "@/hooks/useTodos";
import Link from "next/link";

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

  return (
    <div className="flex justify-center">
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
              fill-rule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
        <div className="rounded-md bg-gray-300 dark:bg-gray-600 min-h-48 py-3">
          <h1 className="text-2xl text-center font-bold">未完了</h1>
          <IncompleteList
            date={date}
            todoTitle={todoTitle}
            todoId={todoId}
            todos={todos}
            updateStatusTodo={updateStatusTodo}
            updateTitleTodo={updateTitleTodo}
            clickUpdateTitle={clickUpdateTitle}
            setTodoTitle={setTodoTitle}
            onClick={updateTodo}
            setClickUpdateTitle={setClickUpdateTitle}
            deleteTodo={deleteTodo}
          />
        </div>
        <div className="rounded-md bg-gray-400 dark:bg-gray-800 min-h-48 py-3">
          <h1 className="text-2xl text-center font-bold">完了済</h1>
          <DoneList
            date={date}
            todoTitle={todoTitle}
            todoId={todoId}
            todos={todos}
            updateStatusTodo={updateStatusTodo}
            updateTitleTodo={updateTitleTodo}
            clickUpdateTitle={clickUpdateTitle}
            setTodoTitle={setTodoTitle}
            onClick={updateTodo}
            setClickUpdateTitle={setClickUpdateTitle}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import { TodoInput } from "@/components/TodoInput";
import { DoneList } from "@/components/todoList/DoneList";
import { IncompleteList } from "@/components/todoList/IncompleteList";
import { useTodos } from "@/hooks/useTodos";

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
    <div className="w-1/3 py-5 space-y-7">
      <TodoInput
        date={date}
        todo={todo}
        clickUpdateTitle={clickUpdateTitle}
        handleDateChange={handleDateChange}
        setTodo={setTodo}
        onClick={createTodo}
      />
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
  );
}

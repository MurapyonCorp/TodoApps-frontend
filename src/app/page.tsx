"use client";
import { TodoInput } from "@/components/TodoInput";
import { DoneList } from "@/components/todoList/DoneList";
import { IncompleteList } from "@/components/todoList/IncompleteList";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const {
    todo,
    todoTitle,
    setTodo,
    setTodoTitle,
    todos,
    todoId,
    clickUpdateTitle,
    setClickUpdateTitle,
    createTodo,
    updateTodo,
    updateStatusTodo,
    updateTitleTodo,
    deleteTodo,
  } = useTodos();

  return (
    <div className="w-max h-max min-h-full min-w-[33%] py-5 space-y-7 mx-auto">
      <TodoInput
        todo={todo}
        clickUpdateTitle={clickUpdateTitle}
        setTodo={setTodo}
        onSubmit={createTodo}
      />
      <div className="rounded-md bg-blue-400 dark:bg-blue-500 min-w-max min-h-48 h-max py-3">
        <h1 className="text-2xl text-center font-bold">未完了</h1>
        <IncompleteList
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
      <div className="rounded-md bg-teal-400 dark:bg-teal-500 min-h-48 h-max py-3">
        <h1 className="text-2xl text-center font-bold">完了済</h1>
        <DoneList
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

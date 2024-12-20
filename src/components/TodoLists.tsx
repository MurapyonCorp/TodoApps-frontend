import { Dispatch, SetStateAction } from "react";
import { TodoModel, TodoStatus } from "@/models/todos.model";
import { EditDeleteButton } from "@/components/atoms/EditDeleteButton";

type Props = {
  listsAreaClassName: string;
  h1Text: string;
  date: {
    startDate: string;
    endDate: string;
  };
  choice: TodoStatus.incomplete | TodoStatus.done;
  todoTitle: string;
  todoId: string;
  todos: TodoModel[];
  updateStatusTodo: Function;
  updateTitleTodo: Function;
  checked: boolean;
  labelClassName: string;
  clickUpdateTitle: boolean;
  setTodoTitle: Dispatch<SetStateAction<string>>;
  onClick: () => void;
  setClickUpdateTitle: Dispatch<SetStateAction<boolean>>;
  deleteTodo: Function;
};

export const TodoLists = (props: Props) => {
  const {
    listsAreaClassName,
    h1Text,
    date,
    choice,
    todoTitle,
    todos,
    todoId,
    updateStatusTodo,
    updateTitleTodo,
    checked,
    labelClassName,
    clickUpdateTitle,
    setTodoTitle,
    onClick,
    setClickUpdateTitle,
    deleteTodo,
  } = props;

  const todoLists = todos.filter(
    (todo) =>
      JSON.stringify(todo.target_date) === JSON.stringify(date) &&
      todo.status === choice
  );

  return (
    <div className={listsAreaClassName}>
      <h1 className="text-2xl text-center font-bold">{h1Text}</h1>
      {todoLists?.length > 0 && (
        <ul className="min-w-max mt-2">
          {todoLists.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between space-x-4 py-2"
            >
              <input
                type="checkbox"
                className="text-red-400 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                onChange={() => updateStatusTodo(todo)}
                checked={checked}
              />
              <div className="flex min-w-0 flex-1 items-center space-x-3">
                <div className="min-w-0 flex-1">
                  {clickUpdateTitle && todo.id === todoId ? (
                    <input
                      type="text"
                      className="w-full py-1 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                      value={todoTitle}
                      onChange={(e) => setTodoTitle(e.target.value)}
                    />
                  ) : (
                    <label className={labelClassName}>{todo.title}</label>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                {clickUpdateTitle && todo.id === todoId ? (
                  <>
                    <EditDeleteButton
                      onClick={onClick}
                      className="flex items-center rounded bg-gray-100 px-0.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                      svgClassName="w-5 h-5"
                      path_dproperty="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    />
                    <EditDeleteButton
                      onClick={() => setClickUpdateTitle(false)}
                      className="flex items-center rounded bg-red-100 px-0.5 py-0.5 text-xs font-medium text-red-800 hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                      svgClassName="w-5 h-5"
                      path_dproperty="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
                    />
                  </>
                ) : (
                  <>
                    <EditDeleteButton
                      onClick={() => updateTitleTodo(todo)}
                      className="flex items-center rounded bg-gray-100 px-0.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                      svgClassName="w-5 h-5"
                      path_dproperty="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z"
                    />
                    <EditDeleteButton
                      onClick={() => deleteTodo(todo)}
                      className="flex items-center rounded bg-red-100 px-0.5 py-0.5 text-xs font-medium text-red-800 hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                      svgClassName="w-5 h-5"
                      path_dproperty="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

import { TodoModel, TodoStatus } from "@/models/todos.model";

type Props = {
  todos: TodoModel[];
  updateStatusTodo: Function;
  updateTitleTodo: Function;
  deleteTodo: Function;
};

export const IncompleteList = (props: Props) => {
  const { todos, updateStatusTodo, updateTitleTodo, deleteTodo } = props;
  const incompleteTodos = todos.filter(
    (todo) => todo.status == TodoStatus.incomplete
  );

  return (
    <>
      {incompleteTodos?.length > 0 && (
        <ul className="mx-40 min-w-max mt-2">
          {incompleteTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between space-x-4 py-1"
            >
              <input
                type="checkbox"
                className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                onChange={() => updateStatusTodo(todo)}
                checked={todo.status == TodoStatus.done ? true : false}
              />
              <div className="flex min-w-0 flex-1 items-center space-x-3">
                <div className="min-w-0 flex-1">
                  {}
                  <label className="truncate font-medium text-gray-900 dark:text-gray-100">
                    {todo.title}
                  </label>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => updateTitleTodo(todo)}
                  className="flex items-center rounded bg-gray-100 px-0.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo)}
                  className="flex items-center rounded bg-red-100 px-0.5 py-0.5 text-xs font-medium text-red-800 hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

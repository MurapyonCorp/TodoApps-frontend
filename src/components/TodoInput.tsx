import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type Props = {
  date: { startDate: any; endDate: any };
  todo: string;
  clickUpdateTitle: boolean;
  handleDateChange: any;
  setTodo: Dispatch<SetStateAction<string>>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const TodoInput = (props: Props) => {
  const { date, todo, clickUpdateTitle, handleDateChange, setTodo, onClick } =
    props;

  return (
    <div
      className="flex flex-row space-x-3"
      onClick={() => console.log(date)}
    >
      <span className="flex-auto">
        <Datepicker
          primaryColor="red"
          i18n="ja"
          placeholder="select date"
          displayFormat="YYYY/MM/DD"
          value={date}
          onChange={handleDateChange}
          useRange={false}
          asSingle={true}
          disabled={clickUpdateTitle}
        />
      </span>
      <input
        type="text"
        className="flex-auto w-full py-2 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
        placeholder="Enter your task"
        value={todo}
        disabled={clickUpdateTitle}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="button"
        disabled={clickUpdateTitle || todo === "" || date.startDate === null}
        onClick={onClick}
        className="min-w-max inline-flex items-center text-gray-900 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg p-2 text-center text-sm disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 mr-1"
        >
          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
        </svg>
        追加
      </button>
    </div>
  );
};

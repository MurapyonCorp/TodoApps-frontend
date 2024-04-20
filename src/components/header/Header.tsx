import Image from "next/image";

export const Header = () => {
  return (
    <div className="grid grid-rows-1 grid-cols-12">
      <h1 className="basis-auto font-bold text-3xl text-center">Todo app</h1>
      <Image src={"/images/shisa.png"} alt={"shisa"} width={41} height={41} className="ml-2"/>
      <form className="space-x-4 col-start-6 col-span-3 grid grid-cols-11">
        <input
          type="text"
          className="col-span-8 py-2 px-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your task"
        />
        <button className="col-span-2 inline-flex items-center text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg p-2 space-x-2 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
          </svg>
          <p className="text-sm">追加</p>
        </button>
      </form>
    </div>
  );
};

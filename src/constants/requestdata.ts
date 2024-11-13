/**
 * HTTPリクエストのURL
 * @type {Object}
 */

export const REQUEST_DATA = {
  TODO_GET:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/todos"
      : "https://todoapps-backend.onrender.com/todos",
  TODO_POST:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/todos"
      : "https://todoapps-backend.onrender.com/todos",
  TODO_PUT:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/todos"
      : "https://todoapps-backend.onrender.com/todos",
  TODO_DELETE:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/todos/"
      : "https://todoapps-backend.onrender.com/todos/",
};

export const REQUEST_TIME_DATA = {
  COUNTUP_GET:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/countup-timers"
      : "https://todoapps-backend.onrender.com/countup-timers",
  COUNTUP_POST:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/countup-timers"
      : "https://todoapps-backend.onrender.com/countup-timers",
  COUNTUP_PUT:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/countup-timers"
      : "https://todoapps-backend.onrender.com/countup-timers",
  COUNTUP_DELETE:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/countup-timers/"
      : "https://todoapps-backend.onrender.com/countup-timers/",
};

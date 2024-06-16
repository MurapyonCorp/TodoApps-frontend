import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "flowbite-react";
import { CountUpTimerModel } from "@/models/countUpTimers.model";

type Props = {
  countUpTimers: CountUpTimerModel[];
};

export const CalendarCard = (props: Props) => {
  const { countUpTimers } = props;

  return (
    <div className="relative h-full">
      <Card className="absolute w-[1200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto">
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale={"ja"}
          contentHeight={825}
          dayCellContent={(arg) => arg.date.getDate()}
          businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
          dayHeaderClassNames={"bg-gray-300 dark:bg-gray-700"}
          events={countUpTimers.map((countUpTimer) => ({
            title: countUpTimer.total_amounts,
            start: countUpTimer.target_date.startDate,
            end: countUpTimer.target_date.endDate,
            color: "red",
          }))}
        />
      </Card>
    </div>
  );
};

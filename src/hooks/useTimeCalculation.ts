import { useCountUpTimers } from "./useCountUpTimers";

export const useTimeCalculation = () => {
  const { countUpTimers } = useCountUpTimers();

  // countUpTimer配列の日付(startDate)をその日のみに限定した配列を新たに作成。
  const filterADay = countUpTimers.map((dateValue) =>
    countUpTimers.filter(
      (value) => value.target_date.startDate === dateValue.target_date.startDate
    )
  );

  // filterADay配列の重複要素を排除した新たな配列
  const aDayElementArray = Array.from(
    new Map(
      filterADay.map((unique) => [JSON.stringify(unique), unique])
    ).values()
  );

  // 登録している記録の日付を配列に格納
  const dateArray = Array.from(
    new Map(
      countUpTimers.map((pickup) => [
        pickup.target_date.startDate,
        pickup.target_date.startDate,
      ])
    ).values()
  );

  // 集計したい要素の取得(startDateが2024-09-20の要素を取得するなど)
  const totalOfADay = (date: string) => {
    return (
      aDayElementArray.find((element) =>
        element.find((data) => data.target_date.startDate === date)
      ) ?? []
    );
  };

  const totalTimeCalculation = dateArray.map((date) => {
    const totalHoursOfADay = totalOfADay(date)
      // 上記の配列の中から分の値を取り出して新たな配列を作成。
      .map((array) => {
        return array.time_hours;
      })
      // 配列内の全要素の合計値を返す。
      .reduce((total, element) => {
        return total + element;
      }, 0);

    const totalMinutesOfADay = totalOfADay(date)
      // 上記の配列の中から分の値を取り出して新たな配列を作成。
      .map((array) => {
        return array.time_minutes;
      })
      // 配列内の全要素の合計値を返す。
      .reduce((total, element) => {
        return total + element;
      }, 0);

    const totalSecondsOfADay = totalOfADay(date)
      .map((array) => {
        return array.time_seconds;
      })
      .reduce((total, element) => {
        return total + element;
      }, 0);

    // 分または秒の合計の余りを返す定数
    const surplusCalculation = (surplus: number) => {
      return surplus % 60;
    };

    // 分または秒の合計の繰り上げを返す定数
    const carryUpCalculation = (carryUp: number) => {
      return Math.floor(carryUp / 60);
    };

    const surplusMinutes = surplusCalculation(totalMinutesOfADay);

    const carryUpMinutes = carryUpCalculation(totalMinutesOfADay);

    const surplusSeconds = surplusCalculation(totalSecondsOfADay);

    const carryUpSeconds = carryUpCalculation(totalSecondsOfADay);

    const totalHours = totalHoursOfADay + carryUpMinutes;

    const totalMinutes = surplusMinutes + carryUpSeconds;

    return { totalHours, totalMinutes, surplusSeconds, date };
  });

  return { totalOfADay, totalTimeCalculation };
};

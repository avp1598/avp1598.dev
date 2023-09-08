const formatMinutes = (min: number) => {
  return min < 10 ? "0" + min : min;
};

export const convertToReadableDate = (timestamp: number) => {
  const shortenedDaysOfTheWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const shortenedMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date(timestamp);
  return (
    <>
      {shortenedDaysOfTheWeek[currentDate.getDay()]} {currentDate.getDate()}{" "}
      {shortenedMonth[currentDate.getMonth()]}{" "}
      <span className="time">
        {currentDate.getHours()}:{formatMinutes(currentDate.getMinutes())}
      </span>
    </>
  );
};

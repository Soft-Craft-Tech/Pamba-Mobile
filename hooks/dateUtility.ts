export function formatDate(dateString: string) {
  const date = new Date(dateString);
  function getMonthName(): string {
    const options: Intl.DateTimeFormatOptions = { month: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  function getDayNumber(): number {
    return date.getDate();
  }
  function getDayNameAndTime(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: `long`,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  return {
    getMonthName,
    getDayNumber,
    getDayNameAndTime,
  };
}

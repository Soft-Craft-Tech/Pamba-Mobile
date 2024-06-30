export function formatDate(dateString: string) {
  const date = new Date(dateString);
  function getMonthName(): string {
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  function getDayNumber(): number {
    return date.getUTCDate();
  }
  function getDayNameAndTime(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: `long`,
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  return {
    getMonthName,
    getDayNumber,
    getDayNameAndTime,
  };
}

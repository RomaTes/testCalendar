export function createCalendar(month, year) {
    //setActiveMonth(month);
    const firstDayOfMonth = new Date(year, month, 1);
    // Define the number of days in the month
    const numDaysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();
    //const N = numDaysInMonth;
    const allDaysInMonth = Array.from({length: numDaysInMonth}, (_, index) => index + 1);
    const emptyDays = Array.from({length: startingDayOfWeek-1}, (_, i) => i + 1)

    //setActiveMonth(month);
    // setDataDays(arr);
    // setStartDay(Array.from({length: startingDayOfWeek-1}, (_, i) => i + 1));
    console.log("!!!!!",allDaysInMonth,  emptyDays)
    return {allDaysInMonth,  emptyDays};
  }
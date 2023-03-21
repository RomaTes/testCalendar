export function createCalendar(month, year) {
    const firstDayOfMonth = new Date(year, month, 1);
    const numDaysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const allDaysInMonth = Array.from({length: numDaysInMonth}, (_, index) => index + 1);
    const emptyDays = Array.from({length: startingDayOfWeek-1}, (_, i) => i + 1)
    return {allDaysInMonth,  emptyDays};
}
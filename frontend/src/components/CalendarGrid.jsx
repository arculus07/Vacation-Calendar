import React, { useMemo } from 'react';

function CalendarGrid({ date, holidays, isQuarterlyView = false }) {
    if (!date) {
        return null;
    }

    const month = date.getMonth();
    const year = date.getFullYear();

    const calendarData = useMemo(() => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const paddingDays = Array(firstDayOfMonth).fill(null);
        const totalDays = [...paddingDays, ...days];
        const weeks = [];
        for (let i = 0; i < totalDays.length; i += 7) {
            weeks.push(totalDays.slice(i, i + 7));
        }
        return weeks;
    }, [month, year]);
    
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className={`bg-gray-800 p-4 rounded-xl shadow-2xl ${isQuarterlyView ? 'w-full' : 'max-w-4xl mx-auto'}`}>
            <h3 className="text-xl font-bold text-center mb-4 text-green-300">{date.toLocaleString('default', { month: 'long' })} {year}</h3>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {weekDays.map(day => (
                            <th key={day} className="text-center pb-3 text-gray-400 font-normal text-sm">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {calendarData.map((week, weekIndex) => {
                        const holidaysInWeek = week.filter(day => {
                            if (!day) return false;
                            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            return holidays[dateString];
                        }).length;

                        let weekBgClass = '';
                        if (holidaysInWeek === 1) {
                            weekBgClass = 'bg-blue-600/60';
                        } else if (holidaysInWeek > 1) {
                            weekBgClass = 'bg-green-800/50';
                        }

                        return (
                            <tr key={weekIndex} className={`transition-colors duration-500 ${weekBgClass}`}>
                                {week.map((day, dayIndex) => {
                                    const dateString = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
                                    const holidayName = holidays[dateString];
                                    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

                                    let dayClasses = "h-20 sm:h-24 text-center align-top p-1 sm:p-2 relative border-t border-l border-gray-700";
                                    if (dayIndex === 0) dayClasses += " border-l-0";
                                    if (weekIndex === 0) dayClasses += " border-t-0";
                                    
                                    return (
                                        <td key={dayIndex} className={dayClasses}>
                                            {day && (
                                                <>
                                                    <span className={`flex items-center justify-center text-sm w-7 h-7 rounded-full ${isToday ? 'bg-green-500 text-white font-bold' : ''} ${holidayName ? 'font-bold text-green-300' : ''}`}>
                                                        {day}
                                                    </span>
                                                    {holidayName && (
                                                        <div className="absolute bottom-1 left-1 right-1 text-xs px-1 py-0.5 rounded-md bg-gray-900/80 text-green-200 truncate" title={holidayName}>
                                                            {holidayName}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CalendarGrid;
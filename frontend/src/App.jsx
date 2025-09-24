import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, LayoutGrid } from 'lucide-react';

function VideoBackground() {
    return (
        <>
            <video autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover z-[-2]">
                <source src="/videos/background15.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="fixed top-0 left-0 w-full h-full bg-white/70 backdrop-blur-sm z-[-1]"></div>
        </>
    );
}

function SplashScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 tracking-wider">
                Vacation Calendar
            </h1>
            <p className="text-gray-600 mt-4 text-lg animate-fade-in-delay">
                Planning your time, simplified.
            </p>
        </div>
    );
}

function CalendarApp() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedCountry, setSelectedCountry] = useState('IN');
    const [holidays, setHolidays] = useState({});
    const [view, setView] = useState('monthly');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const year = currentDate.getFullYear();

    useEffect(() => {
        const getHolidays = async () => {
            setLoading(true);
            setError(null);
            try {
                const holidayData = await fetchHolidays(selectedCountry, year);
                const holidaysMap = holidayData.reduce((acc, holiday) => {
                    acc[holiday.date.iso.slice(0, 10)] = holiday.name;
                    return acc;
                }, {});
                setHolidays(holidaysMap);
            } catch (err) {
                setError(err.message);
                setHolidays({});
            } finally {
                setLoading(false);
            }
        };
        getHolidays();
    }, [selectedCountry, year]);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
            <Header countryCode={selectedCountry} />
            <Controls
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                view={view}
                setView={setView}
            />
            <main>
                {loading && (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                )}
                {error && (
                    <div className="flex justify-center items-center h-96 bg-white/50 rounded-lg">
                        <p className="text-red-500 text-lg text-center">
                            <span className="font-bold">Error:</span> {error}<br />
                            <span className="text-sm text-gray-500">Please check the backend server and try again.</span>
                        </p>
                    </div>
                )}
                {!loading && !error && (
                    view === 'monthly' ? (
                        <CalendarGrid date={currentDate} holidays={holidays} />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {[0, 1, 2].map(offset => {
                                const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
                                return <CalendarGrid key={offset} date={monthDate} holidays={holidays} isQuarterlyView={true} />;
                            })}
                        </div>
                    )
                )}
            </main>
        </div>
    );
}

export default function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <VideoBackground />
            {showSplash ? <SplashScreen /> : <CalendarApp />}
        </>
    );
}

const fetchHolidays = async (countryCode, year) => {
    const API_BASE_URL = 'https://vacation-calendar-zase.onrender.com/api/v1';//'http://127.0.0.1:8000/api/v1'
    try {
        const response = await fetch(`${API_BASE_URL}/holidays/${countryCode}/${year}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch holidays');
        }
        const data = await response.json();
        return data.response.holidays;
    } catch (error) {
        console.error("Error in fetchHolidays service:", error);
        throw error;
    }
};

const countries = { 'IN': 'India', 'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia', 'DE': 'Germany', 'FR': 'France', 'JP': 'Japan', 'CN': 'China', 'BR': 'Brazil' };

function Header({ countryCode }) {
    const countryName = countries[countryCode] || 'World';
    return (
        <header className="mb-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-wider">Global Vacation Calendar</h1>
            <p className="text-gray-600 mt-2">Displaying holidays and festivals for <span className="font-semibold text-green-600">{countryName}</span></p>
        </header>
    );
}

function Controls({ currentDate, setCurrentDate, selectedCountry, setSelectedCountry, view, setView }) {
    const handlePrev = () => { const newDate = new Date(currentDate); newDate.setMonth(currentDate.getMonth() - (view === 'quarterly' ? 3 : 1)); setCurrentDate(newDate); };
    const handleNext = () => { const newDate = new Date(currentDate); newDate.setMonth(currentDate.getMonth() + (view === 'quarterly' ? 3 : 1)); setCurrentDate(newDate); };
    const handleCountryChange = (e) => setSelectedCountry(e.target.value);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white/60 backdrop-blur-md rounded-xl shadow-lg gap-4 border border-gray-200/50">
            <div className="flex items-center gap-4">
                <button onClick={handlePrev} className="p-2 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white text-gray-600 transition-all duration-300 shadow-sm"><ChevronLeft size={24} /></button>
                <h2 className="text-xl sm:text-2xl font-semibold w-48 text-center text-gray-700">{currentDate ? `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}` : '...'}</h2>
                <button onClick={handleNext} className="p-2 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white text-gray-600 transition-all duration-300 shadow-sm"><ChevronRight size={24} /></button>
            </div>
            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 shadow-inner">
                <select value={selectedCountry} onChange={handleCountryChange} className="bg-transparent text-gray-700 border-0 focus:ring-0 outline-none appearance-none"><option value="" disabled>Select Country</option>{Object.entries(countries).map(([code, name]) => (<option key={code} value={code} className="bg-white text-black">{name}</option>))}</select>
            </div>
            <div className="flex items-center gap-2 p-1 bg-gray-200 rounded-full shadow-sm">
                <button onClick={() => setView('monthly')} className={`px-4 py-2 rounded-full transition-colors duration-300 ${view === 'monthly' ? 'bg-green-500 text-white' : 'hover:bg-gray-300 text-gray-600'}`}><Calendar size={20} /></button>
                <button onClick={() => setView('quarterly')} className={`px-4 py-2 rounded-full transition-colors duration-300 ${view === 'quarterly' ? 'bg-green-500 text-white' : 'hover:bg-gray-300 text-gray-600'}`}><LayoutGrid size={20} /></button>
            </div>
        </div>
    );
}

function CalendarGrid({ date, holidays, isQuarterlyView = false }) {
    if (!date) return null;
    const month = date.getMonth();
    const year = date.getFullYear();
    const calendarData = useMemo(() => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const paddingDays = Array(firstDayOfMonth).fill(null);
        const totalDays = [...paddingDays, ...days];
        const weeks = [];
        for (let i = 0; i < totalDays.length; i += 7) { weeks.push(totalDays.slice(i, i + 7)); }
        return weeks;
    }, [month, year]);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className={`bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200/50 ${isQuarterlyView ? 'w-full' : 'max-w-4xl mx-auto'}`}>
            <h3 className="text-xl font-bold text-center mb-4 text-green-600">{date.toLocaleString('default', { month: 'long' })} {year}</h3>
            <table className="w-full border-collapse">
                <thead><tr>{weekDays.map(day => (<th key={day} className="text-center pb-3 text-gray-500 font-normal text-sm">{day}</th>))}</tr></thead>
                <tbody>
                    {calendarData.map((week, weekIndex) => {
                        const holidaysInWeek = week.filter(day => { if (!day) return false; const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; return holidays[dateString]; }).length;
                        let weekBgClass = '';
                        if (holidaysInWeek === 1) { weekBgClass = 'bg-green-200/90'; } 
                        else if (holidaysInWeek > 1) { weekBgClass = 'bg-green-400/90'; }
                        return (
                            <tr key={weekIndex} className={`transition-colors duration-500 ${weekBgClass}`}>
                                {week.map((day, dayIndex) => {
                                    const dateString = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
                                    const holidayName = holidays[dateString];
                                    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
                                    const dayClasses = "h-20 sm:h-24 text-center align-top p-1 sm:p-2 relative border border-gray-200/50";
                                    return (
                                        <td key={dayIndex} className={dayClasses}>
                                            {day && (
                                                <>
                                                    <span className={`flex items-center justify-center text-sm w-7 h-7 rounded-full text-gray-700 ${isToday ? 'bg-green-500 text-white font-bold' : ''} ${holidayName ? 'font-bold text-green-600' : ''}`}>{day}</span>
                                                    {holidayName && (<div className="absolute bottom-1 left-1 right-1 text-xs px-1 py-0.5 rounded-md bg-white/80 text-green-700 truncate" title={holidayName}>{holidayName}</div>)}
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


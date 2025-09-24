import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, LayoutGrid } from 'lucide-react';

const countries = {
    'IN': 'India', 'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia', 'DE': 'Germany', 'FR': 'France', 'JP': 'Japan', 'CN': 'China', 'BR': 'Brazil'
};

function Controls({ currentDate, setCurrentDate, selectedCountry, setSelectedCountry, view, setView }) {
    const handlePrev = () => {
        const newDate = new Date(currentDate);
        const step = view === 'quarterly' ? 3 : 1;
        newDate.setMonth(currentDate.getMonth() - step);
        setCurrentDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        const step = view === 'quarterly' ? 3 : 1;
        newDate.setMonth(currentDate.getMonth() + step);
        setCurrentDate(newDate);
    };

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-gray-800 rounded-xl shadow-lg gap-4">
            <div className="flex items-center gap-4">
                <button onClick={handlePrev} className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition-colors duration-300 shadow-md"><ChevronLeft size={24} /></button>
                <h2 className="text-xl sm:text-2xl font-semibold w-48 text-center">
                    {currentDate ? `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}` : '...'}
                </h2>
                <button onClick={handleNext} className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition-colors duration-300 shadow-md"><ChevronRight size={24} /></button>
            </div>
            <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 shadow-inner">
                <select value={selectedCountry} onChange={handleCountryChange} className="bg-transparent text-white border-0 focus:ring-0 outline-none appearance-none">
                    {Object.entries(countries).map(([code, name]) => (
                        <option key={code} value={code} className="bg-gray-800">{name}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2 p-1 bg-gray-700 rounded-full shadow-md">
                <button onClick={() => setView('monthly')} className={`px-4 py-2 rounded-full transition-colors duration-300 ${view === 'monthly' ? 'bg-green-500' : 'hover:bg-gray-600'}`}>
                    <Calendar size={20} />
                </button>
                <button onClick={() => setView('quarterly')} className={`px-4 py-2 rounded-full transition-colors duration-300 ${view === 'quarterly' ? 'bg-green-500' : 'hover:bg-gray-600'}`}>
                    <LayoutGrid size={20} />
                </button>
            </div>
        </div>
    );
}

export default Controls;

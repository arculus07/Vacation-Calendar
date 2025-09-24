import React from 'react';

const countries = {
    'IN': 'India', 'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia', 'DE': 'Germany', 'FR': 'France', 'JP': 'Japan', 'CN': 'China', 'BR': 'Brazil'
};

function Header({ countryCode }) {
    const countryName = countries[countryCode] || 'World';

    return (
        <header className="mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-400 tracking-wider">Global Vacation Calendar</h1>
            <p className="text-gray-400 mt-2">Displaying holidays and festivals for <span className="font-semibold text-green-300">{countryName}</span></p>
        </header>
    );
}

export default Header;

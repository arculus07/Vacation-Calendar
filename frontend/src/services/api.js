const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';
export const fetchHolidays = async (countryCode, year) => {
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

import os
import requests
from functools import lru_cache
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HolidayDate(BaseModel):
    iso: str

class Holiday(BaseModel):
    name: str
    description: str
    date: HolidayDate
    type: List[str]

class CalendarificResponse(BaseModel):
    holidays: List[Holiday]

class APIResponse(BaseModel):
    meta: dict
    response: CalendarificResponse

@lru_cache(maxsize=10)
def fetch_holidays_from_api(api_key: str, country: str, year: int):
    api_url = "https://calendarific.com/api/v2/holidays"
    params = {
        'api_key': api_key,
        'country': country,
        'year': year
    }
    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=503, detail=f"External API error: {e}")

@app.get("/api/v1/holidays/{country_code}/{year}", response_model=APIResponse)
def get_holidays(country_code: str, year: int):
    api_key = os.getenv("CALENDARIFIC_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured")

    holidays_data = fetch_holidays_from_api(api_key, country_code, year)
    if "response" not in holidays_data or "holidays" not in holidays_data["response"]:
        raise HTTPException(status_code=500, detail="Invalid data structure from external API")

    return holidays_data

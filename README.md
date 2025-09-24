# Global Vacation Calendar

A full-stack web application designed to provide a clean, intuitive, and visually appealing way to view public holidays and festivals from around the world.  
This project was built with a focus on modern development practices, performance, and a premium user experience.

**Live Demo** | **API Endpoint**

---

## About The Project

In a globalized world, keeping track of holidays across different countries can be challenging.  
This application solves that problem by offering a simple, fast, and elegant interface to view this information.

The project is architected with a fully decoupled frontend and backend, reflecting real-world design patterns used in scalable web applications.  
Special care was taken in designing the user interface, focusing on clarity, responsiveness, and subtle animations to deliver a polished user experience.

---

## Key Features

- Animated splash screen providing a professional entry point.  
- Dynamic calendar views with both a monthly and a quarterly perspective.  
- Global holiday and festival data available for multiple countries.  
- Intelligent week highlighting:  
  - Weeks with a single holiday are marked in light green.  
  - Weeks with multiple holidays are marked in dark green.  
- A premium, responsive interface optimized for desktops, tablets, and mobile devices.  

---

## Technology Stack

### Backend
- FastAPI (Python) – High-performance web framework for APIs.  
- Uvicorn – ASGI server for running FastAPI applications.  

### Frontend
- React – Component-based library for building user interfaces.  
- Vite – Next-generation frontend build tool.  
- Tailwind CSS – Utility-first CSS framework for rapid, customized styling.  

### External Services
- Calendarific API – Source of comprehensive global holiday and festival data.  

---

## Architectural Highlights

- **Decoupled Architecture** – Frontend and backend are fully separated, enabling independent development, deployment, and scaling.  
- **Performance-Optimized Backend** – API responses are intelligently cached, ensuring fast responses and reduced reliance on external API calls.  
- **Maintainable Frontend** – Clean, modular React components designed for reusability and long-term maintainability.  

---

## Local Setup and Installation

### Prerequisites
- Node.js (v18 or newer)  
- Python (v3.8 or newer)  
- A free Calendarific API key  

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/vacation-calendar.git
cd vacation-calendar
````

---

### Step 2: Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Add API key in .env
echo 'CALENDARIFIC_API_KEY="your_api_key_here"' > .env

# Run the backend server
uvicorn main:app --reload
```

The backend will be available at **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will be available at **[http://localhost:5173](http://localhost:5173)**

---

## Acknowledgments

* Holiday and festival data provided by [Calendarific API](https://calendarific.com/).
* Background video sourced from [Pexels](https://www.pexels.com/).
* Initial frontend scaffolding assisted by Google’s Gemini.

---

## Developed By

**Ayush Ranjan**

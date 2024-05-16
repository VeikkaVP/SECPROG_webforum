# SECPROG Course Project

## Introduction
This project serves as a practice backend and frontend solution developed as part of the SECPROG course. The goal is to demonstrate the integration of a Python-based backend with a React and Node.js frontend using modern frameworks and tools.

## Technologies Used
- **Backend**: Python with Flask framework
- **Frontend**: React with Node.js, using the Vite framework

## Installation Instructions

### Backend Setup

1. **Prerequisites**
   - Ensure that Python 3.12 is installed on your device.

2. **Getting Started**
   - Navigate to the `Assignment/backend` folder in your project directory.

3. **Virtual Environment**
   - Create a virtual environment to isolate package dependencies:
     ```
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```
       .\venv\Scripts\activate
       ```
     - On macOS and Linux:
       ```
       source venv/bin/activate
       ```

4. **Install Dependencies**
   - Install the required packages:
     ```
     pip install -r requirements.txt
     ```
   - Due to a known dependency bug, upgrade the installations (REQUIRED TO RUN THE BACKEND):
     ```
     pip install --upgrade -r requirements.txt
     ```

5. **Running the Server**
   - Start the backend server:
     ```
     python3 run.py
     ```
   - The server should now be listening on [http://localhost:5001](http://localhost:5001).

### Frontend Setup

1. **Navigate to Frontend**
   - Open the frontend folder in seperate cmd/powershell instance:


2. **Install Dependencies**
   - Install necessary Node.js packages:
     ```
     npm install
     ```

3. **Running the Frontend**
   - Launch the frontend application:
     ```
     npm run frontend
     ```
   - Vite will automatically open the browser to the hosted site.


## Known bugs
    - Frontend logout button calls the logout functionality twice.
    - Installing the required python packages mandates an immediate upgrade to them (this issue could be solved by studying which versioning numbers are working but ran out of time so this solution works).
    - Some limitations not existing correctly (not allowing a logged in user access the login page. Logging in again overrides the currently logged user).

## License
[MIT License](LICENSE.md) - feel free to use this project for your own learning or projects.

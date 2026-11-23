# EduTrack: Student Learning and Progress Management System

A system to maintain student information and track learning progress in an organised way.

## Features
- Student profile management (add, edit, delete)
- Assessment records per student and subject
- Progress tracking with performance levels (Excellent 80+, Good 60-79, Needs support below 60)
- Search and filter by name, ID or class
- Dashboard with trend, subject and distribution charts
- Individual student progress reports

## Tech stack
| Layer | Technology |
|-------|------------|
| Application logic | Java (JDBC) |
| Database | MySQL, SQL |
| User interface | HTML, CSS, JavaScript |

## Project structure
```
student-learning-progress-system/
├── database/   schema.sql          MySQL tables, sample data, report query
├── backend/    src/StudentDAO.java Java data access layer (JDBC)
│               lib/                Put the MySQL Connector/J jar here
├── frontend/   index.html          Dashboard page
│               css/style.css       Styles (light and dark mode)
│               js/app.js           Dashboard logic and charts
└── docs/       PROJECT_OVERVIEW.md Design notes and interview talking points
```

## Getting started
1. **Database:** run `database/schema.sql` in MySQL (`mysql -u root -p < database/schema.sql`).
2. **Backend:** download MySQL Connector/J into `backend/lib/`, set your password in `StudentDAO.java`, then:
   ```
   cd backend
   javac -cp "lib/*" -d out src/StudentDAO.java
   java -cp "out:lib/*" StudentDAO        # use ";" instead of ":" on Windows
   ```
3. **Frontend:** open `frontend/index.html` in a browser. It runs on sample data in memory.

## Architecture
Dashboard (HTML/CSS/JS) -> Java application logic -> JDBC -> MySQL -> results back to the dashboard.

## Current status and next steps
The dashboard is a front-end demo with sample data. Planned: a REST API (Spring Boot) connecting it to MySQL, login with teacher and admin roles, and PDF report export.

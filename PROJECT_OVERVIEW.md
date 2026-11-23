# Project overview

**Purpose:** keep student information in one place and track learning progress.

## Database design
- `students` (student_id PK, full_name, class_name, email UNIQUE)
- `assessments` (assessment_id PK, student_id FK, subject, test_name, score 0-100, test_date)
- One student has many assessments. `ON DELETE CASCADE` removes records with the student.
- Index on `assessments.student_id` speeds up joins and lookups.

## Progress logic
Progress is the average score across a student's assessments, grouped into Excellent, Good and Needs support.

## Interview talking points
- Why `PreparedStatement`: prevents SQL injection.
- Why a foreign key: keeps data consistent, with no orphan records.
- What I learned: managing structured data and how technology makes student information easier to manage.
- What I would improve: REST API, authentication and roles, PDF export, attendance tracking.

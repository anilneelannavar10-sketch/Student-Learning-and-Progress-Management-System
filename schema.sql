CREATE DATABASE IF NOT EXISTS student_progress;
USE student_progress;

CREATE TABLE students (
  student_id VARCHAR(10) PRIMARY KEY,
  full_name  VARCHAR(100) NOT NULL,
  class_name VARCHAR(10)  NOT NULL,
  email      VARCHAR(100) UNIQUE
);

CREATE TABLE assessments (
  assessment_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id    VARCHAR(10) NOT NULL,
  subject       VARCHAR(50) NOT NULL,
  test_name     VARCHAR(50) NOT NULL,
  score         DECIMAL(5,2) NOT NULL CHECK (score BETWEEN 0 AND 100),
  test_date     DATE NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

CREATE INDEX idx_assess_student ON assessments(student_id);

INSERT INTO students VALUES
 ('S101','Aarav Sharma','10-A','aarav@school.in'),
 ('S102','Diya Nair','10-A','diya@school.in');
INSERT INTO assessments (student_id,subject,test_name,score,test_date) VALUES
 ('S101','Maths','Unit Test 1',88,'2026-11-10'),
 ('S101','Science','Unit Test 1',92,'2026-11-11'),
 ('S102','Maths','Unit Test 1',79,'2026-11-10');

-- Progress report: average per student with performance level
SELECT s.student_id, s.full_name, s.class_name,
       ROUND(AVG(a.score),1) AS avg_score,
       CASE WHEN AVG(a.score) >= 80 THEN 'Excellent'
            WHEN AVG(a.score) >= 60 THEN 'Good'
            ELSE 'Needs support' END AS level
FROM students s LEFT JOIN assessments a ON a.student_id = s.student_id
GROUP BY s.student_id, s.full_name, s.class_name
ORDER BY avg_score DESC;

---Task 1

--48. Run EXPLAIN (PostgreSQL) 

/*Nested Loop  (cost=11.91..42.10 rows=10 width=554)
Hash Join  (cost=11.76..40.15 rows=10 width=240)
Hash Cond: (e.student_id = s.student_id)
Seq Scan on enrollments e  (cost=0.00..24.50 rows=1450 width=8)
Hash  (cost=11.75..11.75 rows=1 width=240)
Seq Scan on students s  (cost=0.00..11.75 rows=1 width=240)
Filter: (enrollment_year = 2022)
Index Scan using courses_pkey on courses c  (cost=0.14..0.20 rows=1 width=322)
Index Cond: (course_id = e.course_id)*/

--49. query plan structure

-- EXPLAIN shows a Sequential Scan on enrollments.
-- EXPLAIN shows a Sequential Scan on students.
-- EXPLAIN shows an Index Scan on courses using courses_pkey.

-- 50. Note the estimated cost (PostgreSQL) 

-- enrollments scan cost: 0.00..24.50
-- estimated rows: 1450

-- students scan cost: 0.00..11.75
-- estimated rows: 1

-- courses index scan cost: 0.14..0.20
-- estimated rows: 1


----Task 2
--51. Create a B-Tree index on students.enrollment_year.
create index idx_students_enrollment_year on  students(enrollment_year);
--52. Create a composite UNIQUE index on enrollments(student_id, course_id) 
create unique index idx_enrollment_unique on enrollments(student_id, course_id);
--53. Create an index on courses.course_code
create index indx_course_code on courses(course_code);
--54.Re-run the EXPLAIN from Task 1 and compare the new plan to the baseline.

-- Baseline plan:
-- Seq Scan on students
-- Seq Scan on enrollments

-- After creating indexes:
-- PostgreSQL still chose Seq Scan on students and enrollments.
-- Reason: the tables are very small, so a Sequential Scan is cheaper.
-- The index remains available and would be beneficial on larger datasets.

--55. Create a partial index on enrollments(student_id) WHERE grade IS NULL to optimise lookups for unevaluated enrollments.
create index idx_null_grades on enrollments(student_id ) where grade is null;
--Partial indexes (PostgreSQL) only index rows matching a condition — smaller and faster for specific query patterns.


---Task 3:

--56. Simulate the N+1 problem 
--57. Rewrite the script using a single JOIN query 
--58. Compare the number of database round-trips between the two approaches and log the difference using Python's time module.
--59. Document in comments: in a real application with 10,000 enrollments, how many extra queries would the N+1 version issue?

----task 1

--Find all students who are enrolled in more courses than the average number of enrollments per student. 
select s.student_id, concat(s.first_name, ' ', s.last_name) as student_name, count(e.course_id) as course_count
from students s join enrollments e on s.student_id = e.student_id group by s.student_id, s.first_name, s.last_name
having count(e.course_id) >( select avg(course_count) from
    (
        select count(course_id) as course_count from enrollments group by student_id
    ) avg_enrollments );

--List courses in which all enrolled students have received a grade of 'A'. 
select course_id,course_name from courses where course_id not in ( select course_id from enrollments where grade <> 'A' );

--Find the professor with the highest salary in each department using a correlated subquery.
select p1.prof_name, p1.salary,p1.department_id from professors p1 where p1.salary =
(select max(p2.salary) from professors p2 where p2.department_id = p1.department_id );

-- Using a subquery in the FROM clause (derived table), calculate the per-department average salary and then filter to departments where that average exceeds 85,000.
select * FROM (select department_id, AVG(salary) AS avg_salary FROM professors GROUP BY department_id ) dept_avg
WHERE avg_salary > 85000;

----Task 2

--Create a view vw_student_enrollment_summary showing each student's full name, department, number of courses enrolled in, and GPA (average grade converted: A=4, B=3, C=2, D=1, F=0).
create view vw_student_enrollment_summary as select concat(s.first_name,' ',s.last_name) as student_name, d.dept_name, count(e.course_id) as total_courses, round(avg(case when e.grade='A' then 4
when e.grade='B' then 3 when e.grade='C' then 2 when e.grade='D' then 1 when e.grade='F' then 0 end),2)as gpa from students s join departments d on s.department_id=d.department_id join enrollments e on s.student_id=e.student_id 
group by  s.student_id, d.dept_name;

--Create a view vw_course_stats showing course_name, course_code, total_enrollments, and avg_gpa for each course.
create view vw_course_stats as select  c.course_name, c.course_code, count(e.student_id) as total_enrollments, round(avg(case when e.grade='A' then 4
when e.grade='B' then 3 when e.grade='C' then 2 when e.grade='D' then 1 when e.grade='F' then 0 end),2)as avg_gpa from courses c left join enrollments e
on c.course_id=e.course_id group by c.course_id,c.course_name,c.course_code;

--Query vw_student_enrollment_summary to find students with GPA above 3.0.
select * from vw_student_enrollment_summary where gpa > 3.0;

--Attempt to UPDATE a row through vw_student_enrollment_summary and note what happens. 
update vw_student_enrollment_summary set gpa = 4 where student_name = 'Arjun Mehta';
--ERROR:  cannot update view "vw_student_enrollment_summary"
-- Multi-table views are generally not updatable because
-- the database cannot determine which underlying table
-- should be modified when a view combines multiple tables.

--DROP both views and recreate vw_student_enrollment_summary as a view WITH CHECK OPTION
drop view vw_course_stats;
drop view vw_student_enrollment_summary;


----Task 3: Stored Procedures and Transactions
---Write a stored procedure function fn_enroll_student (PostgreSQL) that accepts student_id, course_id, and enrollment_date, checks for duplicate enrollment, and inserts the record.
create or replace function fn_enroll_student(
    p_student_id INT,
    p_course_id INT,
    p_enrollment_date DATE
)
returns VOID
language plpgsql
as $$
begin
    if exists (
        SELECT 1
        FROM enrollments
        WHERE student_id = p_student_id
        AND course_id = p_course_id
    ) then
        RAISE EXCEPTION 'Student already enrolled in this course';
    end if;
    insert into enrollments(
        student_id,
        course_id,
        enrollment_date
    )
    values(
        p_student_id,
        p_course_id,
        p_enrollment_date
    );
end;
$$;

---Write a procedure sp_transfer_student that moves a student from one department to another. Wrap the UPDATE and a log-insert into a new table department_transfer_log inside a single transaction. ROLLBACK if either statement fails.
CREATE TABLE department_transfer_log(
    log_id SERIAL PRIMARY KEY,
    student_id INT,
    old_department INT,
    new_department INT,
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE PROCEDURE sp_transfer_student(
    p_student_id INT,
    p_new_department INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_old_department INT;
BEGIN
    SELECT department_id
    INTO v_old_department
    FROM students
    WHERE student_id = p_student_id;
    UPDATE students
    SET department_id = p_new_department
    WHERE student_id = p_student_id;
    INSERT INTO department_transfer_log(
        student_id,
        old_department,
        new_department
    )
    VALUES(
        p_student_id,
        v_old_department,
        p_new_department
    );
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;
$$;

---Test the transaction by manually introducing an error (e.g., invalid foreign key) and verify that the first UPDATE is also rolled back.
BEGIN;
UPDATE students
SET department_id = 2
WHERE student_id = 1;
-- Deliberate error
INSERT INTO non_existing_table
VALUES (1);
ROLLBACK;


---Use SAVEPOINT to create a mid-transaction checkpoint: insert two enrollment records; set a SAVEPOINT after the first; deliberately fail the second; ROLLBACK TO SAVEPOINT and verify only the first record was saved.

BEGIN;
--First Insert
INSERT INTO enrollments(student_id, course_id, enrollment_date, grade)
VALUES(10,2,CURRENT_DATE,'A');
--savepoint
SAVEPOINT first_insert;


--Using invalid course_id:
INSERT INTO enrollments( student_id, course_id, enrollment_date, grade ) VALUES(10,999,CURRENT_DATE,'A');

--Expected FK error.

ROLLBACK TO SAVEPOINT first_insert;

COMMIT;

-- SAVEPOINT allows partial rollback.
-- The first enrollment insert was preserved.
-- The second insert failed and was rolled back.
-- COMMIT saved only the successful work.
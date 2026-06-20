----Task 1

--insert two additional students into the students table.
insert into students (first_name, last_name,email, date_of_birth, department_id, enrollment_year) 
values('Rahul', 'Kumar', 'rahul.kumar@college.edu', '2005-06-15', 1, 2022),
('Anjali', 'Sharma', 'anjali.sharma@college.edu', '2004-02-10', 2, 2023);

--Update the grade of student_id = 5 for course_id = 1 from 'C' to 'B'
update enrollments set grade='B' where student_id=5 and course_id=1;

---Delete enrollments where grade IS NULL
select * from enrollments where grade is null;
delete from enrollments where grade is null;

--row counts using SELECT COUNT(*) after each operation.
select count(*) from students;
---Total students: 10

select count(*) from enrollments;
--(Originally 12 rows, minus 2 NULL-grade rows.)   

----Task 2

--Retrieve all students enrolled in 2022, ordered by last_name alphabetically.
select * from students where enrollment_year= 2022 order by last_name asc;

--Find all courses with more than 3 credits, sorted by credits descending.
select * from courses where credits>3 order by credits desc;

--List all professors whose salary is between 80,000 and 95,000.
select * from professors where salary>=80000 and salary<=95000;
select * from professors where salary between 80000 and 95000;

--Find all students whose email ends with '@college.edu' using the LIKE operator
select * from students where email like '%@college.edu';

--Count the total number of students per enrollment_year.
select enrollment_year, count(*) as total_students from students group by enrollment_year order by enrollment_year;

----Task 3

--List each student's full name (first_name + ' ' + last_name) alongside the name of their department.
select s.first_name || ' ' || s.last_name as student_name, d.dept_name from students s  join departments d on s.department_id = d.department_id; 
select concat(s.first_name, ' ', s.last_name) as student_name, d.dept_name from students s join departments d on s.department_id = d.department_id;

--Show each enrollment along with the student's name and the course name. (3-table JOIN: enrollments, students, courses.)
select s.first_name || ' ' || s.last_name as student_name, c.course_name, e.enrollment_date, e.grade
from enrollments e join students s on e.student_id = s.student_id join courses c on e.course_id = c.course_id;

--Find all students who are NOT enrolled in any course using a LEFT JOIN and WHERE ... IS NULL pattern.
select s.student_id, s.first_name, s.last_name from students s left join enrollments e on s.student_id = e.student_id 
where e.student_id is null;

--Display every course along with the number of students enrolled in it. Courses with zero enrolments  must still appear. 
select c.course_name, count(e.student_id) as total_students from courses c left join enrollments e on c.course_id = e.course_id group by c.course_id,
c.course_name order by c.course_id;

--List each department along with its professors and their salaries. Include departments that have no professors yet.
select d.dept_name, p.prof_name, p.salary from departments d left join professors p on d.department_id = p.department_id
order by d.dept_name;

----Task 4: 

--Calculate the total number of enrollments per course. Display course_name and enrollment_count.
select c.course_name, count (e.enrollment_id) as enrollment_count from courses c left join enrollments e on 
c.course_id = e.course_id group by c.course_id, c.course_name order by enrollment_count desc;

--Find the average salary of professors per department. Round to 2 decimal places.
select d.dept_name, round(avg(p.salary), 2) as avg_salary from departments d join professors p
on d.department_id = p.department_id group by d.department_id, d.dept_name; 

--Find all departments where the total budget exceeds 600,000.
select dept_name, sum(budget) as total_budget from departments group by dept_name having sum(budget) > 600000;

--Show the grade distribution for course CS101: count of each grade (A, B, C, D, F).
select e.grade, count(*) as grade_count from enrollments e join courses c on e.course_id = c.course_id where c.course_code = 'CS101'
group by e.grade order by e.grade;

--Using HAVING, list departments where more than 2 students are enrolled across all courses in that department.
select d.dept_name,count(s.student_id) as student_count from departments d
join students s on d.department_id = s.department_id group by d.department_id, d.dept_name
having count(s.student_id) > 2;
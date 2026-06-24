from sqlalchemy.orm import sessionmaker
from models import (
    engine,
    Department,
    Student,
    Course,
    Enrollment
)
from sqlalchemy.orm import joinedload
Session = sessionmaker(bind=engine)
session = Session()


"""
Task 3: Fixing the N+1 Query Problem

Without joinedload():
---------------------
SQLAlchemy first loaded all enrollments and then
executed additional queries whenever enrollment.student or enrollment.course was accessed.

Observed:
1 query for enrollments
4 queries for students
3 queries for courses

Total ≈ 8-9 SQL queries.

With joinedload():
------------------
session.query(Enrollment).options(
    joinedload(Enrollment.student),
    joinedload(Enrollment.course)
)

SQLAlchemy generated a single SQL statement using
LEFT OUTER JOIN on students and courses.

Result:
Query count reduced from multiple queries
to a single query.

This eliminates the N+1 problem and improves
ORM performance.
"""

'''
#inserting the dataaaa
dept1 = Department(
    dept_name="Computer Science",
    head_of_dept="Dr. Ramesh Kumar",
    budget=850000
)

dept2 = Department(
    dept_name="Electronics",
    head_of_dept="Dr. Priya Nair",
    budget=620000
)

dept3 = Department(
    dept_name="Mechanical",
    head_of_dept="Dr. Suresh Iyer",
    budget=540000
)
if session.query(Department).count() == 0:
    session.add_all([dept1, dept2, dept3])
session.commit()
print("Departments inserted")

student1 = Student(
    first_name="Rahul",
    last_name="Sharma",
    email="rahul@gmail.com",
    enrollment_year=2023,
    department=dept1
)

student2 = Student(
    first_name="Ananya",
    last_name="Patel",
    email="ananya@gmail.com",
    enrollment_year=2022,
    department=dept1
)

student3 = Student(
    first_name="Priya",
    last_name="Nair",
    email="priya@gmail.com",
    enrollment_year=2024,
    department=dept2
)

student4 = Student(
    first_name="Amit",
    last_name="Singh",
    email="amit@gmail.com",
    enrollment_year=2023,
    department=dept3
)

student5 = Student(
    first_name="Sneha",
    last_name="Reddy",
    email="sneha@gmail.com",
    enrollment_year=2024,
    department=dept1
)
if session.query(Student).count() == 0:
    session.add_all([
        student1,
        student2,
        student3,
        student4,
        student5
    ])

session.commit()
print("Students inserted")

course1 = Course(
    course_name="Database Systems",
    course_code="CS301",
    credits=4,
    department_id=1
)

course2 = Course(
    course_name="Data Structures",
    course_code="CS201",
    credits=4,
    department_id=1
)

course3 = Course(
    course_name="Digital Electronics",
    course_code="EC101",
    credits=3,
    department_id=2
)
if session.query(Course).count() == 0:
    session.add_all([
        course1,
        course2,
        course3
    ])
session.commit()
print("Courses inserted")

enroll1 = Enrollment(
    student=student1,
    course=course1
)

enroll2 = Enrollment(
    student=student2,
    course=course1
)

enroll3 = Enrollment(
    student=student3,
    course=course3
)

enroll4 = Enrollment(
    student=student5,
    course=course2
)

session.add_all([
    enroll1,
    enroll2,
    enroll3,
    enroll4
])
print("Enrollments inserted")
session.commit()
'''
#Read -Query all students in department 'Computer Science' using session.query(Student).join(Department).filter(Department.dept_name == 'Computer Science').
'''print("\nStudents in Computer Science Department:")

students = (
    session.query(Student)
    .join(Department)
    .filter(Department.dept_name == "Computer Science")
    .all()
)

for student in students:
    print(
        student.student_id,
        student.first_name,
        student.last_name,
        student.email
    )'''
"""
#Read:Query all enrollments and print each student's name alongside course name. 
print("\nEnrollment Details:")

enrollments = session.query(Enrollment).all()

for enrollment in enrollments:
    print(
        enrollment.student.first_name,
        "->",
        enrollment.course.course_name
    )

N+1 Query Observation:

Without eager loading, SQLAlchemy first loads all enrollments
in one query. Then additional queries are executed when
accessing enrollment.student and enrollment.course.

Observed:
1 query for enrollments
4 queries for students
3 queries for courses
Total ≈ 8-9 SQL queries.
This is the N+1 problem and will be fixed using joinedload()
in Task 3.

#85. UPDATE: Find a specific student by email and update their enrollment_year. Commit
print("\nUpdating Student...")
student = (
    session.query(Student)
    .filter_by(email="rahul@gmail.com")
    .first()
)
student.enrollment_year = 2026
session.commit()
print("Updated Successfully")

#86. DELETE: Remove an enrollment record using session.delete(enrollment_obj). Commit and verify.
print("\nDeleting Enrollment...")
enrollment = session.query(Enrollment).first()
session.delete(enrollment)
session.commit()
print("Enrollment deleted successfully")
#Before delete : 4 , after delete :3"""

#Task 3
#87. Identify the N+1 query from Task 2 Step 5 by counting the SQL log lines with echo=True.
'''Query 1 -> Load enrollments
Query 2 -> Load Rahul
Query 3 -> Load Database Systems
Query 4 -> Load Ananya
Query 5 -> Load Priya
Query 6 -> Load Digital Electronics
Query 7 -> Load Sneha
Query 8 -> Load Data Structures'''
#88. Rewrite the query using joinedload: 
print("\nEnrollment Details Using joinedload:")

enrollments = (
    session.query(Enrollment)
    .options(
        joinedload(Enrollment.student),
        joinedload(Enrollment.course)
    )
    .all()
)

for enrollment in enrollments:
    print(
        enrollment.student.first_name,
        "->",
        enrollment.course.course_name
    )

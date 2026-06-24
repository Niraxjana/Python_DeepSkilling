from sqlalchemy.orm import sessionmaker
from hands_on_6.models_old_db import engine, Department, Student

Session = sessionmaker(bind=engine)

session = Session()
'''departments = session.query(Department).all()
#session.query(Department).all() -- same as SELECT * FROM departments;


for dept in departments:
    print(dept)
'''
departments = session.query(Department).all()

for dept in departments:
    print(f"\nDepartment: {dept.dept_name}")

    for student in dept.students:
        print(student.first_name, student.last_name)


students = session.query(Student).all()

for student in students:
    print(
        student.first_name,
        student.last_name,
        student.department.dept_name
    )

import psycopg2
import time
conn = psycopg2.connect(
    host="localhost",
    database="college_db",
    user="postgres",
    password="postgres123"
)

print("Connected successfully!")

cur = conn.cursor()

# -----------------------------
# VERSION 1: N+1 PROBLEM
# -----------------------------

start = time.time()

query_count = 0

cur.execute("SELECT * FROM enrollments")
enrollments = cur.fetchall()
query_count += 1

for enrollment in enrollments:
    student_id = enrollment[1]

    cur.execute(
        "SELECT first_name, last_name FROM students WHERE student_id = %s",
        (student_id,)
    )

    cur.fetchone()
    query_count += 1

end = time.time()

print("=== N+1 VERSION ===")
print("Queries executed:", query_count)
print("Time:", end - start, "seconds")

# -----------------------------
# VERSION 2: SINGLE JOIN
# -----------------------------

start = time.time()

cur.execute("""
    SELECT e.enrollment_id,
           s.first_name,
           s.last_name,
           e.course_id,
           e.grade
    FROM enrollments e
    JOIN students s
    ON e.student_id = s.student_id
""")

rows = cur.fetchall()

end = time.time()

print("\n=== JOIN VERSION ===")
print("Queries executed: 1")
print("Time:", end - start, "seconds")

cur.close()
conn.close()

'''
Connected successfully!
=== N+1 VERSION ===
Queries executed: 14
Time: 0.0336000919342041 seconds

=== JOIN VERSION ===
Queries executed: 1
Time: 0.006617546081542969 seconds'''

'''
N+1 Analysis
If there are 10,000 enrollments:
 1 query fetches enrollments
 10,000 additional queries fetch student names
 Total = 10,001 queries

JOIN version performs the same work
 using only 1 query.

 Extra queries issued by N+1 version = 10,000'''
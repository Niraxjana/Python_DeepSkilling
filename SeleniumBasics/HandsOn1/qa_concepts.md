# Hands-On 1 – QA Concepts, Functional Testing & Defect Lifecycle

## Task 1: Map Testing Types to a Real System

### 1. Testing Types for Course Management API

### Unit Testing
**Description:** Test the `create_course()` function independently by mocking the database.

**Test Case:**
- Input: Course Code = CS101, Name = Python Basics
- Expected Result: Function returns a Course object successfully.

**Classification:** Functional Testing

---

### Integration Testing
**Description:** Test the POST `/api/courses/` endpoint together with the database.

**Test Case:**
- Send a valid POST request.
- Verify the course is stored in the database.

**Classification:** Functional Testing

---

### System Testing
**Description:** Test the complete workflow.

**Test Case:**
1. Create a course.
2. Retrieve the course.
3. Update the course.
4. Delete the course.
5. Verify deletion.

**Classification:** Functional Testing

---

### User Acceptance Testing (UAT)

**Scenario:**
A college administrator logs into the application, creates a new course, verifies it appears in the course list, edits it, and deletes it successfully.

**Classification:** Functional Testing

---

## 2. Functional vs Non-Functional Testing

Functional testing verifies whether the API performs the expected business functionality.

Non-functional testing verifies quality attributes such as speed, security, scalability, and reliability.

### Non-Functional Test Example

**Performance Testing**

- Send 1000 concurrent POST requests.
- Expected Result:
  - Response time < 2 seconds.
  - No server crash.
  - No request loss.

---

## 3. Black-Box vs White-Box Testing

### Black-Box Testing

- Tester does not know the internal code.
- Focuses on inputs and outputs.
- Performed mainly by QA engineers.

Example:
Verify POST `/api/courses/` returns HTTP 201 without seeing the source code.

---

### White-Box Testing

- Tester has knowledge of internal code.
- Tests code paths, conditions, loops, and branches.
- Usually performed by developers.

Example:
Testing every branch inside the `create_course()` function.

---

## 4. Formal Test Cases

| Test Case ID | Description | Preconditions | Test Steps | Expected Result | Actual Result | Pass/Fail |
|--------------|-------------|---------------|------------|-----------------|---------------|-----------|
| TC001 | Create course with valid data | API running | POST valid JSON | HTTP 201 Created | | |
| TC002 | Create duplicate course | Course already exists | POST same course code | HTTP 409 Conflict | | |
| TC003 | Missing required fields | API running | POST without course name | HTTP 422 Validation Error | | |

---

# Task 2 – Defect Lifecycle & Severity Classification

## 5. Defect Lifecycle

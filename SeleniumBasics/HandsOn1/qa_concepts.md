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

# Task 2: Defect Lifecycle & Severity Classification

## 5. Defect Lifecycle

The Defect Lifecycle describes the stages a defect goes through from the time it is identified until it is resolved.

```
                 +----------------+
                 |      New       |
                 +----------------+
                          |
                          v
                 +----------------+
                 |    Assigned    |
                 +----------------+
                          |
                          v
                 +----------------+
                 |      Open      |
                 +----------------+
                          |
                          v
                 +----------------+
                 |     Fixed      |
                 +----------------+
                          |
                          v
                 +----------------+
                 |    Retest      |
                 +----------------+
                          |
                  +-------+-------+
                  |               |
             Pass |               | Fail
                  v               |
          +---------------+       |
          |   Verified    | <-----+
          +---------------+
                  |
                  v
          +---------------+
          |    Closed     |
          +---------------+

Additional Paths:
-----------------
Rejected  : The reported issue is not a valid defect, cannot be reproduced, or works as intended.

Deferred  : The defect is acknowledged but postponed to a future release due to low priority, limited resources, or project deadlines.
```

### Description of Each State

- **New:** QA tester identifies and reports a new defect.
- **Assigned:** The defect is assigned to a developer.
- **Open:** The developer starts investigating and fixing the issue.
- **Fixed:** The developer fixes the defect and marks it as resolved.
- **Retest:** QA retests the application using the same steps.
- **Verified:** QA confirms the defect has been fixed successfully.
- **Closed:** The defect is officially closed.

**Rejected:** The issue is not considered a defect or cannot be reproduced.

**Deferred:** The defect is accepted but postponed to a future release.

---

# 6. Severity and Priority Classification

| Bug | Severity | Priority | Justification |
|------|----------|----------|---------------|
| **a. POST /api/courses/ returns 500 Internal Server Error for all requests** | **Critical** | **P1 (Highest)** | The API's core functionality is completely broken. Users cannot create courses, making the application unusable. It requires an immediate fix. |
| **b. Course names longer than 150 characters are silently truncated without an error** | **Medium** | **P2** | The application still functions, but data is lost without notifying the user, affecting data integrity and user experience. |
| **c. The `/docs` Swagger page contains a typo in the API description** | **Low** | **P4 (Lowest)** | This is only a documentation/cosmetic issue. It does not affect the application's functionality. |
| **d. Login occasionally returns 401 for valid credentials (intermittent issue)** | **High** | **P1** | Although intermittent, it affects user authentication and indicates possible instability. It should be fixed urgently because it impacts user trust and system reliability. |

---

# 7. Defect Report

### Defect ID
**BUG-001**

### Title
POST `/api/courses/` returns HTTP 500 Internal Server Error for all valid requests.

### Environment
- Operating System: Windows 11
- Browser: Google Chrome 138+
- Backend: FastAPI
- Database: PostgreSQL
- Python Version: 3.12

### Build Version
Version **1.0.0**

### Severity
**Critical**

### Priority
**P1**

### Steps to Reproduce

1. Start the Course Management API server.
2. Open Swagger UI (`/docs`).
3. Select **POST /api/courses/**.
4. Enter valid course details.
5. Click **Execute**.

### Expected Result

- The course should be created successfully.
- API should return **HTTP 201 Created**.
- The course should be stored in the database.

### Actual Result

- API returns **HTTP 500 Internal Server Error**.
- No course is created in the database.

### Attachments

- Screenshot of HTTP 500 error.

---

# 8. Difference Between Severity and Priority

## Severity

Severity indicates **how serious the defect is** and how much it impacts the application's functionality.

**Example:** If users cannot log in because the login service is down, the defect has **Critical Severity** because the application cannot be used.

---

## Priority

Priority indicates **how quickly the defect should be fixed** based on business needs and customer impact.

**Example:** A spelling mistake on the CEO's dashboard has **Low Severity** because it does not affect functionality, but **High Priority** because it is highly visible and should be corrected before an important presentation.

---

## High Severity Does Not Always Mean High Priority

**Example:**

An old "Export to XML" feature crashes when used.

- **Severity:** High (the feature fails completely).
- **Priority:** Low (P3/P4), because very few users use this feature and it is not required for the current release.

This example shows that a defect can have **High Severity** but **Low Priority** depending on business requirements.

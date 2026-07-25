# Hands-On 2 – SDLC vs TDLC (V-Model & Agile QA Integration)

## Task 1: V-Model Mapping

### 9. V-Model Diagram

```
                    SDLC (Development)

           Requirements Analysis
                   │
                   │
            System Design
                   │
                   │
         Architecture Design
                   │
                   │
            Module Design
                   │
                   │
                Coding
                   │
                   │
          Unit Testing
                   │
                   │
      Integration Testing
                   │
                   │
          System Testing
                   │
                   │
      Acceptance Testing

              TDLC (Testing)
```

### SDLC to TDLC Mapping

| SDLC Phase | Corresponding TDLC Phase | Purpose |
|------------|--------------------------|---------|
| Requirements Analysis | Acceptance Testing | Verify the software satisfies customer requirements. |
| System Design | System Testing | Validate the complete application against system specifications. |
| Architecture Design | Integration Testing | Verify communication between modules and APIs. |
| Module Design | Unit Testing | Test individual functions or classes independently. |
| Coding | Implementation | Source code is developed before testing begins. |

---

## 10. Test Artifacts Produced During Development

| Development Phase | Testing Phase | Test Artifact Produced |
|-------------------|--------------|------------------------|
| Requirements Analysis | Acceptance Testing | Acceptance Test Plan, User Acceptance Test Cases |
| System Design | System Testing | System Test Plan, System Test Cases |
| Architecture Design | Integration Testing | Integration Test Plan, Integration Test Cases |
| Module Design | Unit Testing | Unit Test Cases, Unit Test Plan |
| Coding | All Testing | Source Code, Build Package |

### Explanation

- During **Requirements Analysis**, QA prepares Acceptance Test Plans to verify business requirements.
- During **System Design**, QA creates System Test Cases covering complete workflows.
- During **Architecture Design**, QA prepares Integration Test Cases for module interactions.
- During **Module Design**, QA designs Unit Test Cases for individual methods/functions.

---

## 11. Entry Criteria and Exit Criteria

### A. Unit Testing

**Entry Criteria**
- Module development completed.
- Code successfully compiled.
- Development environment ready.

**Exit Criteria**
- All unit test cases executed.
- All critical defects fixed.
- Unit test report prepared.

---

### B. Integration Testing

**Entry Criteria**
- Unit testing completed successfully.
- Modules integrated.
- Test environment available.

**Exit Criteria**
- APIs communicate correctly.
- No unresolved High/Critical integration defects.
- Integration report completed.

---

### C. System Testing

**Entry Criteria**
- Complete application deployed.
- Integration testing passed.
- Test environment mirrors production.

**Exit Criteria**
- All planned system test cases executed.
- Functional requirements validated.
- No Critical or High defects remain.

---

### D. Acceptance Testing (UAT)

**Entry Criteria**
- System testing completed.
- Client/business users available.
- Production-like environment ready.

**Exit Criteria**
- Business users approve the software.
- Acceptance document signed.
- Application ready for deployment.

---

## 12. Early QA Engagement in the V-Model

### 1. Requirements Review

QA participates during requirement gathering to:

- Identify ambiguous requirements.
- Verify requirements are testable.
- Suggest missing validation rules.
- Prevent misunderstandings before development.

**Example**

Requirement says:

"Course name should be valid."

QA asks:

- Maximum length?
- Special characters allowed?
- Mandatory field?

This avoids defects later.

---

### 2. Design Review

QA reviews the API design before coding.

Checks include:

- API endpoints
- HTTP status codes
- Validation rules
- Error handling
- Database relationships

Example:

QA verifies that duplicate Course IDs return **409 Conflict** instead of **500 Internal Server Error**.

---

# Task 2: Agile QA and Shift-Left Testing

## 13. Problems with Waterfall Testing

In the Waterfall model, testing starts only after development is completed. This causes several issues.

### Problem 1: Defects are Found Late

If the Course Management API contains errors, they are detected only after the entire application is developed. Fixing defects at this stage is expensive and time-consuming.

---

### Problem 2: Requirement Misunderstandings

If developers misunderstand a requirement (e.g., allowing duplicate course codes), QA identifies the issue only after implementation. Rework is required across multiple components.

---

### Problem 3: Delayed Product Release

Since development and testing happen sequentially, any major defect discovered during testing delays deployment. Developers must fix issues while QA repeats testing, increasing project duration.

---

## 14. QA Responsibilities in Agile Ceremonies

| Agile Ceremony | QA Responsibilities |
|----------------|--------------------|
| Sprint Planning | Review user stories, identify risks, define acceptance criteria, estimate testing effort. |
| Daily Stand-up | Report testing progress, discuss blockers, coordinate with developers, update defect status. |
| Sprint Review | Validate completed features, perform demo testing, verify sprint goals, collect stakeholder feedback. |
| Sprint Retrospective | Analyze testing challenges, discuss improvements, suggest process changes, improve automation and collaboration. |

---

## 15. Shift-Left Testing Practices

### A. Review Requirements for Testability

QA reviews requirements before development begins.

Example:
Ensure the API clearly specifies mandatory fields, maximum character limits, duplicate course handling, and validation rules.

Benefit:
Reduces requirement-related defects.

---

### B. Write Test Cases Before Coding (TDD/BDD)

QA prepares test cases before developers implement the feature.

Example:
Create test cases for POST `/api/courses` before writing the API.

Benefit:
Developers clearly understand expected behavior.

---

### C. Static Code Analysis

Use tools such as SonarQube, ESLint, or Pylint to detect coding issues without executing the application.

Example:
Detect unused variables, code duplication, security vulnerabilities, and coding standard violations.

Benefit:
Improves code quality and reduces runtime defects.

---

### D. API Contract Testing Before Integration

Validate API request and response formats before frontend and backend integration.

Example:

Expected Request

```json
{
  "course_code": "CS101",
  "course_name": "Python Programming"
}
```

Expected Response

```json
{
  "id": 1,
  "course_code": "CS101",
  "course_name": "Python Programming"
}
```

Benefit:
Prevents integration failures between frontend and backend teams.

---

## 16. Acceptance Criteria (Given-When-Then)

### Scenario 1: Successful Course Creation

**Given** the college admin is logged into the system

**And** enters a unique course code with all mandatory details

**When** the admin clicks the **Create Course** button

**Then** the system should create the course successfully

**And** display a success message

**And** return HTTP Status Code **201 Created**.

---

### Scenario 2: Duplicate Course Code

**Given** a course with Course Code **CS101** already exists

**When** the admin submits another course with the same Course Code

**Then** the system should reject the request

**And** display the message **"Course Code already exists."**

**And** return HTTP Status Code **409 Conflict**.

---

### Scenario 3: Missing Required Fields

**Given** the admin opens the Create Course page

**When** mandatory fields such as Course Name or Course Code are left blank

**And** the admin submits the form

**Then** the system should display validation error messages

**And** highlight the missing fields

**And** return HTTP Status Code **422 Unprocessable Entity**.
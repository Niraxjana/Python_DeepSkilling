# Hands-On 3 – Test Automation Process, Lifecycle & Framework Types

# Task 1: Automation Decision and Test Case Selection

## 17. Criteria for Deciding Whether a Test Case Should Be Automated

### 1. Frequency of Execution

Tests that are executed repeatedly are good candidates for automation because automation saves time and effort.

**Application to Scenario:**
Testing whether **POST /api/courses/** returns **201 Created** is performed after every code change, making it suitable for automation.

---

### 2. Regression Testing

Regression tests ensure existing functionality continues to work after new changes.

**Application to Scenario:**
The POST endpoint is a core API feature and should always be included in the regression suite.

---

### 3. Stability of the Feature

Stable features that rarely change are ideal for automation.

**Application to Scenario:**
The course creation API is a stable business feature, making it a good automation candidate.

---

### 4. Repeatability

Tests requiring the same steps with consistent expected results should be automated.

**Application to Scenario:**
Sending valid course data and verifying HTTP 201 always follows the same procedure.

---

### 5. Business Criticality

Critical business functions should always be automated to detect failures quickly.

**Application to Scenario:**
Creating courses is a primary feature of the Course Management System, so automating this test reduces business risk.

---

## 18. Automate or Manual?

| Test Case                                                         | Decision     | Justification                                                                          |
| ----------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------- |
| a) Regression test for all CRUD endpoints after every code change | **Automate** | Frequently executed and repetitive.                                                    |
| b) Exploratory testing of a new search feature                    | **Manual**   | Requires human creativity and observation.                                             |
| c) Performance test with 100 concurrent users                     | **Automate** | Performance testing requires automation tools for accuracy and repeatability.          |
| d) UI test for the login form                                     | **Automate** | Login is a stable and frequently tested feature. Selenium can automate it efficiently. |
| e) Verify Swagger API documentation                               | **Manual**   | Documentation changes occasionally and requires human review for clarity and accuracy. |
| f) Smoke test after deployment                                    | **Automate** | Smoke tests are executed after every deployment and should provide quick feedback.     |

---

## 19. Test Automation ROI

### Definition

**Return on Investment (ROI)** in test automation measures whether the time and cost spent creating automated tests are recovered through repeated executions.

### Given

* Automation development time = **4 hours**
* Manual execution time = **30 minutes (0.5 hour)**

### Break-even Calculation

Number of runs required:

```
4 ÷ 0.5 = 8 runs
```

Therefore, **after the 8th execution**, automation becomes more cost-effective than manual testing.

### Maintenance Overhead

After the **10th run**, each execution requires a **20% maintenance overhead**.

Maintenance time per run:

```
20% of 0.5 hour = 0.1 hour (6 minutes)
```

Effective saving after the 10th run:

```
0.5 − 0.1 = 0.4 hour per run
```

Even with maintenance, automation continues to provide significant time savings over repeated executions.

---

## 20. Flaky Tests

### Definition

A **flaky test** is a test that sometimes passes and sometimes fails without any changes to the application.

### Example

A Selenium test clicks the Login button before the page has completely loaded. Sometimes the element is available, and sometimes it is not, causing inconsistent results.

### Strategies to Prevent Flaky Tests

1. Use **Explicit Waits** instead of fixed delays (`Thread.sleep()`).
2. Use reliable and unique locators such as **ID** or **CSS Selectors** instead of fragile XPath expressions.
3. Ensure each test runs independently by resetting test data and avoiding dependencies between tests.

---

# Task 2: Compare Automation Framework Types

## 21. Comparison of Automation Framework Types

### A. Linear Framework

**Description**

The Linear Framework is the simplest automation framework where test cases are written as one continuous script. There is no code reuse or modularity, making it suitable only for very small projects.

**Advantage**

* Easy to understand and implement.

**Disadvantage**

* Difficult to maintain as the project grows.

**Example**

* Automating a single login test for the Course Management System.

---

### B. Modular Framework

**Description**

The application is divided into independent modules such as Login, Dashboard, and Course Management. Each module has reusable scripts that can be combined in different test cases.

**Advantage**

* High code reusability.

**Disadvantage**

* Requires initial planning and modular design.

**Example**

* Reusing the Login module across all Course Management tests.

---

### C. Data-Driven Framework

**Description**

Test logic is separated from test data. Different datasets are stored in Excel, CSV, or JSON files, allowing the same script to execute multiple test scenarios.

**Advantage**

* One script can test many input combinations.

**Disadvantage**

* Managing large datasets can become complex.

**Example**

* Testing login using 50 different usernames and passwords.

---

### D. Keyword-Driven Framework

**Description**

Test cases are written using predefined keywords such as Login, Click, Enter Text, and Logout. The automation engine executes actions based on these keywords.

**Advantage**

* Non-technical testers can create test cases.

**Disadvantage**

* Developing the keyword engine requires additional effort.

**Example**

* Business analysts prepare login tests using keywords without writing Selenium code.

---

### E. Hybrid Framework

**Description**

The Hybrid Framework combines Modular, Data-Driven, and Keyword-Driven approaches. It provides reusable components, external test data, and simplified test execution.

**Advantage**

* Flexible, scalable, and widely used in industry.

**Disadvantage**

* More complex to design initially.

**Example**

* Complete automation suite for Course Management including Login, CRUD operations, reports, and regression testing.

---

## 22. Recommended Framework

### Requirements

* Test login using 50 different user/password combinations.
* Reuse login functionality across 20 test cases.
* Support both technical and non-technical team members.

### Recommendation

A **Hybrid Framework** combining **Modular**, **Data-Driven**, and **Keyword-Driven** approaches is the best choice.

### Justification

* **Data-Driven** handles multiple login credentials efficiently.
* **Modular** allows reuse of the Login module across many test cases.
* **Keyword-Driven** enables non-technical QA members to create and maintain tests.
* **Hybrid** provides scalability, maintainability, and flexibility, making it ideal for enterprise Selenium projects.

---

## 23. Hybrid Framework Folder Structure

```
CourseManagementAutomation/
│
├── config/
│   ├── config.properties
│   └── browser.properties
│
├── testdata/
│   ├── LoginData.xlsx
│   ├── CourseData.xlsx
│   └── users.csv
│
├── pages/
│   ├── LoginPage.java
│   ├── DashboardPage.java
│   ├── CoursePage.java
│   └── ProfilePage.java
│
├── tests/
│   ├── LoginTest.java
│   ├── CourseTest.java
│   ├── SmokeTest.java
│   └── RegressionTest.java
│
├── utilities/
│   ├── ExcelReader.java
│   ├── DriverFactory.java
│   ├── WaitUtils.java
│   ├── ScreenshotUtils.java
│   └── Logger.java
│
├── keywords/
│   ├── LoginKeyword.java
│   ├── ClickKeyword.java
│   └── ValidationKeyword.java
│
├── reports/
│
├── screenshots/
│
├── pom.xml
│
└── README.md
```

### Folder Description

* **config/** – Stores configuration files such as browser settings and application URLs.
* **testdata/** – Contains Excel, CSV, or JSON files used for data-driven testing.
* **pages/** – Implements the Page Object Model (POM), where each page has its own class.
* **tests/** – Stores Selenium test scripts like Login, Smoke, and Regression tests.
* **utilities/** – Contains reusable helper classes for waits, screenshots, logging, and Excel reading.
* **keywords/** – Stores reusable keyword actions for keyword-driven testing.
* **reports/** – Stores generated test execution reports.
* **screenshots/** – Saves screenshots captured during test failures.
* **pom.xml** – Manages Maven dependencies and project configuration.

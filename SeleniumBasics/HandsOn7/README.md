# Hands-on 7 Selenium POM

## Page Object Model

POM separates test logic and UI logic.

Without POM:
If submit button ID changes from "submit" to "btn-submit",
we need to search and modify every test file.

With POM:
Only locator in page class needs to be changed.
All tests continue working.

Benefits:

- Reusability
- Easy maintenance
- Cleaner test files

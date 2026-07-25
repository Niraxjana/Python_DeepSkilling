"""
Hands-On 4 - Task 1

Selenium Components

1. WebDriver
- WebDriver is the core component of Selenium.
- It communicates directly with the browser using browser-specific drivers
  like ChromeDriver or GeckoDriver.
- It sends commands (click, type, navigate) and receives responses.

2. Selenium Grid
- Selenium Grid allows tests to run in parallel.
- It executes tests on multiple machines, browsers, and operating systems.
- It reduces execution time and supports cross-browser testing.

3. Selenium IDE
- Selenium IDE is a browser extension.
- It supports record-and-playback automation.
- It can generate Selenium code for multiple programming languages.
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Chrome options
options = webdriver.ChromeOptions()

# Headless mode
options.add_argument("--headless")

# Launch browser
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

# Implicit Wait
driver.implicitly_wait(10)

"""
Implicit Wait waits globally for every element.

Why is it not recommended?

- It applies to every element even when unnecessary.
- Can slow test execution.
- Difficult to debug timeout issues.
- Explicit Wait is preferred because it waits only for specific elements.
"""

driver.get("https://www.lambdatest.com/selenium-playground/")

print("Page Title:")
print(driver.title)

driver.quit()
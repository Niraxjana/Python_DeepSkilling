from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install())
)

driver.maximize_window()

driver.get("https://www.lambdatest.com/selenium-playground/")

# Click Simple Form Demo
driver.find_element(By.LINK_TEXT, "Simple Form Demo").click()

# Verify URL
assert "simple-form-demo" in driver.current_url

print("URL Assertion Passed")

# Navigate Back
driver.back()

print("Returned to Playground")

# Open Google in new tab
driver.execute_script("window.open('https://www.google.com');")

# List all tabs
tabs = driver.window_handles

print("Window Handles:")
print(tabs)

# Switch to Google tab
driver.switch_to.window(tabs[1])

print("Google Page Title:")
print(driver.title)

# Switch back
driver.switch_to.window(tabs[0])

# Screenshot
driver.save_screenshot("playground_screenshot.png")

print("Screenshot saved successfully.")

# Window size
print("Current Window Size:")
print(driver.get_window_size())

driver.set_window_size(1280, 800)

print("Updated Window Size:")
print(driver.get_window_size())

"""
Consistent window size is important because:

1. Responsive web pages change layout based on screen resolution.
2. Same resolution ensures consistent element locations.
3. Prevents failures caused by different browser sizes.
"""

driver.quit()
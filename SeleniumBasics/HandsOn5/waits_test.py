from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.get("https://www.lambdatest.com/selenium-playground/bootstrap-alert-messages-demo")

# Wait for the button and click it
button = WebDriverWait(driver,10).until(
    EC.element_to_be_clickable((By.XPATH,"//button[contains(text(),'Success Message')]"))
)

button.click()

# Wait for alert
alert = WebDriverWait(driver,10).until(
    EC.visibility_of_element_located((By.CLASS_NAME,"alert-success"))
)

print("Alert:", alert.text)

driver.quit()
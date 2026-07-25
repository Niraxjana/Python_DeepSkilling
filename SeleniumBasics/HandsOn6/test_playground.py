import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC


@pytest.mark.parametrize("message", [
    "Hello",
    "Selenium Automation",
    "12345"
])
def test_simple_form_submission(driver, base_url, message):
    driver.get(base_url + "simple-form-demo")

    # Use the correct input field
    input_box = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.ID, "user-message")
        )
    )

    input_box.clear()
    input_box.send_keys(message)

    driver.find_element(By.ID, "showInput").click()

    output = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(
            (By.ID, "message")
        )
    )

    assert output.text == message


def test_checkbox_demo(driver, base_url):
    driver.get(base_url + "checkbox-demo")

    checkbox = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "(//input[@type='checkbox'])[1]")
        )
    )

    checkbox.click()

    assert checkbox.is_selected()


def test_dropdown_selection(driver, base_url):
    driver.get(base_url + "select-dropdown-demo")

    dropdown = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "select-demo")
        )
    )

    Select(dropdown).select_by_visible_text("Wednesday")

    selected = Select(dropdown).first_selected_option.text

    assert selected == "Wednesday"
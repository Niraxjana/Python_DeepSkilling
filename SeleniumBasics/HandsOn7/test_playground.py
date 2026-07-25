from pages.simple_form_page import SimpleFormPage
from pages.checkbox_page import CheckboxPage
from pages.dropdown_page import DropdownPage
from pages.input_form_page import InputFormPage



BASE_URL="https://www.lambdatest.com/selenium-playground/"



def test_simple_form_submission(driver):

    page = SimpleFormPage(driver)

    page.navigate_to(
        BASE_URL+"simple-form-demo/"
    )

    page.enter_message("Hello Selenium")

    page.click_submit()

    assert page.get_displayed_message()=="Hello Selenium"



def test_checkbox_demo(driver):

    page = CheckboxPage(driver)

    page.navigate_to(
        BASE_URL+"checkbox-demo/"
    )

    page.check_option(0)

    assert page.is_option_checked(0)



def test_dropdown_selection(driver):

    page = DropdownPage(driver)

    page.navigate_to(
        BASE_URL+"select-dropdown-demo/"
    )

    page.select_day("Friday")



def test_input_form_submit(driver):

    page = InputFormPage(driver)

    page.navigate_to(
        BASE_URL+"input-form-demo/"
    )

    page.fill_form(
        "Jayasri",
        "jayasri@gmail.com",
        "9876543210",
        "Chennai"
    )

    page.submit_form()

    assert "Thanks" in page.get_success_message()
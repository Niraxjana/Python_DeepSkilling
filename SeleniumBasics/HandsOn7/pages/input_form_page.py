from selenium.webdriver.common.by import By
from .base_page import BasePage


class InputFormPage(BasePage):

    NAME = (By.NAME,"name")
    EMAIL = (By.NAME,"email")
    PHONE = (By.NAME,"phone")
    ADDRESS = (By.NAME,"address")


    def fill_form(self,name,email,phone,address):

        self.driver.find_element(*self.NAME).send_keys(name)

        self.driver.find_element(*self.EMAIL).send_keys(email)

        self.driver.find_element(*self.PHONE).send_keys(phone)

        self.driver.find_element(*self.ADDRESS).send_keys(address)



    def submit_form(self):

        button = self.driver.find_element(
            By.XPATH,
            "//button[contains(text(),'Submit')]"
        )

        self.driver.execute_script(
            "arguments[0].click();", 
            button
        )


    def get_success_message(self):

        return self.driver.find_element(
            By.TAG_NAME,
            "body"
        ).text
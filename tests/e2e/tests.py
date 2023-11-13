import time
import pytest
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from dotenv import load_dotenv
from os import getenv


load_dotenv()


def get_driver():
    driver = Chrome()
    driver.get(getenv("BASE_URL", "http://127.0.0.1:3000"))
    return driver


@pytest.fixture(scope="class")
def driver(request):
    request.cls.driver = get_driver
    yield
    driver.close()


def auth(driver: Chrome):
    driver.find_element(
        By.XPATH, "//button[contains(@class, 'user_button')]"
    ).click()
    driver.find_element(By.ID, "phone").send_keys("1234567890")
    driver.find_element(
        By.XPATH, "//div[contains(@class, 'login_content')]"
    ).find_element(By.TAG_NAME, "button").click()

    alert = WebDriverWait(driver, 5).until(
        expected_conditions.alert_is_present()
    )
    auth_code = alert.text
    alert.accept()
    driver.find_element(By.ID, "code").send_keys(auth_code)


@pytest.fixture(scope="class")
def authenticated_driver(request):
    driver = get_driver()
    request.cls.driver = driver
    auth(driver)
    yield
    driver.close()


@pytest.fixture(scope="class")
def open_cart(request):
    driver: Chrome = request.cls.driver
    driver.find_element(
        By.XPATH, "//span[contains(@class, 'AppHeader_cart_span')]"
    ).click()
    yield
    driver.find_element(
        By.XPATH, "//div[contains(@class, 'Cart_backtrigger')]"
    ).click()


@pytest.fixture
def ready_cart(request):
    driver: Chrome = request.cls.driver
    driver.find_element(
        By.XPATH, "//div[contains(@class, 'good_card')]"
    ).click()
    driver.find_element(
        By.XPATH, "//div[contains(@class, 'GoodPage_configurations')]"
    ).find_element(By.TAG_NAME, "button").click()
    driver.find_element(
        By.XPATH, "//button[contains(@class, 'GoodPage_add_to_cart')]"
    ).click()

    time.sleep(2)

    driver.find_element(
        By.XPATH, "//span[contains(@class, 'AppHeader_cart_span')]"
    ).click()


@pytest.mark.usefixtures("authenticated_driver")
class TestCart:
    driver: Chrome

    def open_cart(self):
        cart_button = self.driver.find_element(
            By.XPATH, "//span[contains(@class, 'AppHeader_cart_span')]"
        )
        cart_button.click()
        yield
        cart_button.click()

    def empty_cart(self):
        while len(
            decrease_elements := self.driver.find_elements(
                By.XPATH,
                "//*[name()='svg' and contains(@class, 'decrease-quantity')]",
            )
        ):
            for decrease_element in decrease_elements:
                decrease_element.click()
                time.sleep(0.5)
        self.driver.find_element(
            By.XPATH, "//div[contains(@class, 'Cart_backtrigger')]"
        ).click()

    def test_cart_add(self):
        # open good card
        self.driver.find_element(
            By.XPATH, "//div[contains(@class, 'good_card')]"
        ).click()

        # choose configuration
        configurations = self.driver.find_element(
            By.XPATH, "//div[contains(@class, 'GoodPage_configurations')]"
        )
        target_configuration = configurations.find_elements(
            By.TAG_NAME, "button"
        )[1]
        target_configuration.click()
        active_class: str | None = target_configuration.get_attribute("class")
        assert active_class is not None and "active" in active_class

        # add to cart
        self.driver.find_element(
            By.XPATH, "//button[contains(@class, 'GoodPage_add_to_cart')]"
        ).click()

        time.sleep(1)

        cart_badge = self.driver.find_element(
            By.XPATH, "//span[contains(@class, 'AppHeader_cart_span')]"
        )
        # check cart badge product quantity
        assert int(cart_badge.text) > 0

        # empty cart
        cart_badge.click()
        time.sleep(1)
        self.empty_cart()

    def test_cart_product_change(self, ready_cart: None):
        quantity_element = self.driver.find_element(
            By.XPATH, "//div[contains(@class, 'Cart_good_quantity')]"
        )
        (
            decrease_quantity_element,
            increase_quantity_element,
        ) = quantity_element.find_elements(By.TAG_NAME, "svg")
        current_quantity_element = quantity_element.find_element(
            By.TAG_NAME, "span"
        )

        # increase quantity
        previous_quantity = int(current_quantity_element.text)
        increase_quantity_element.click()
        time.sleep(1)
        assert (
            int(quantity_element.find_element(By.TAG_NAME, "span").text)
            == previous_quantity + 1
        )

        # decrease quantity
        previous_quantity = int(current_quantity_element.text)
        decrease_quantity_element.click()
        time.sleep(1)
        assert (
            int(quantity_element.find_element(By.TAG_NAME, "span").text)
            == previous_quantity - 1
        )

        # check empty cart icon
        decrease_quantity_element.click()
        time.sleep(1)
        assert self.driver.find_element(
            By.XPATH,
            "//*[name()='svg' and contains(@class, 'Cart_empty_cart_icon')]",
        ).is_displayed()

        self.driver.find_element(
            By.XPATH, "//div[contains(@class, 'Cart_backtrigger')]"
        ).click()

    def test_promocode(self, ready_cart: None):
        # type promocode
        cart_promocode_element = self.driver.find_element(
            By.XPATH, "//div[contains(@class, 'Cart_promo_code_input')]"
        )
        cart_promocode_element.find_element(By.TAG_NAME, "input").send_keys(
            "МИРЭА"
        )
        cart_promocode_element.find_element(By.TAG_NAME, "button").click()
        time.sleep(1)

        promocode_div_element = self.driver.find_element(
            By.XPATH, "//div[contains(@class, 'Cart_promo_code_div')]"
        )
        assert "МИРЭА" in promocode_div_element.text
        promocode_div_element.find_element(
            By.XPATH,
            "//*[name()='svg' and contains(@class, 'delete-promocode')]",
        ).click()
        time.sleep(1)
        assert "МИРЭА" not in promocode_div_element.text
        self.empty_cart()

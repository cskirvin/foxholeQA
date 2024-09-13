import login_page from "../pages/login_page";
import main_page from "../pages/main_page";

fixture('Login Feature');
// Any pre-condition for the test would be taken care of in the fixture

test('Given a user can log in When the user adds a product then after checkoput the details are verified.', async t => {

    // Given a user can log in
    await login_page.checkLoginPageTitleText();
    await login_page.loginWithInvalidUser('invalid');
    await login_page.loginWithUser();
    await main_page.checkMainPageTitleText()

    await main_page.ensurePricesDoNotExceed('49.00');

    // When the user adds a product

    // Then after checkoput the details are verified.


});
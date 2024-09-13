import { t, Selector } from 'testcafe';

class LoginPage {
    constructor() {
        this.titleText = 'Swag Labs';
        this.userName = ('[data-test="username"]');
        this.password = ('[data-test="password"]');
        this.loginButton = ('[data-test="login-button"]');
        this.errorButton = ('[data-test="error-button"]')
    }

    PASSWORD = "secret_sauce";  // this should move to a constant or env file
    USER = "standard_user";

    /**
     * Check Login page title
     */
    async checkLoginPageTitleText() {
        await t.expect(Selector('title').innerText).eql(this.titleText);
    }

    /**
     * User Login
     */
    async loginWithUser(user = this.USER) {
        await t
            .selectText(this.userName)
            .pressKey('delete')
            .typeText(this.userName, user)
            .selectText(this.password)
            .pressKey('delete')
            .typeText(this.password, this.PASSWORD)
            .click(this.loginButton);
        // .assert
    }

    /**
    * Invalid User Login
    */
    async loginWithInvalidUser(user) {
        await t
            .typeText(this.userName, user)
            .typeText(this.password, this.PASSWORD)
            .click(this.loginButton)
            .expect(Selector(this.errorButton).visible).eql(true)
            .click(this.errorButton);
    }

    /**
     * Refresh the page
     */
    async pageRefresh() {
        await t.eval(() => location.reload(true));
    }

}

export default new LoginPage();
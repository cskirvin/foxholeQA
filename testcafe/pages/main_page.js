import { t, Selector } from 'testcafe';

class MainPage {
    constructor() {
        this.titleText = 'Products';
        this.classTitle = ('[data-test="title"]');
        this.inventoryItemPrice = ('[data-test="inventory-item-price"]');

    }

    PASSWORD = "secret_sauce";  // this should move to a constant or env file
    USER = "standard_user";

    /**
     * Check Login page title
     */
    async checkMainPageTitleText() {
        await t.expect(Selector(this.classTitle).innerText).eql(this.titleText);
    }

    /**
     * Get list of prices
     */
    async ensurePricesDoNotExceed(priceLimit) {
        var priceCount = await Selector(this.inventoryItemPrice).filterVisible().count;
        const elements = Selector(this.inventoryItemPrice)

        for (let i = 0; i < priceCount; i++) {
            const elementSelector = elements.nth(i);
            const price = parseFloat((await elementSelector().innerText).replace('$', ''));
            console.log(price);
            // await t.expect(price).lt(parseFloat(priceLimit), "Price check failed"); 
            // The expect should not be commented out and the if block is to show that it's listing the 
            if (price > parseFloat(priceLimit)) {
                console.log("Price was over the limit: " + price)
            }

        }
    }

}

export default new MainPage();
import { Locator, Page } from '@playwright/test';

interface commodityData {
    commodityName: string;
    
}

class CreateCommodity {


    private page: Page;
    // private commodityName: Locator;
    private savebtn: Locator;
    private commoditynameInput: Locator;
    private Addcommodity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.Addcommodity = page.locator("//*[contains(text(),'Add Commodity')]");
        this.commoditynameInput = page.locator("//input[@name='name']");
        this.savebtn = page.locator("//*[contains(text(),'Save')]");

    }


    async commodityNavigation(): Promise<boolean> {
        try {
            await this.page.goto("https://staging-app.linusanalytics.com/admin/commodities/");
            // await this.page.waitForTimeout(10000);
            if (await this.page.waitForSelector('//nav/div/div/div/div/p[contains(text(),"Commodities")]', { state: 'visible' })) {
                console.log("User navigates to commodity tab");

                return true; // Return true if the commodity tab is visible
            } else {
                console.log("User failed to navigate to commodity tab");
                return false; // Return false if the commodity tab is not visible
            }
        } catch (error) {
            console.error("Error during commodity navigation:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickAddcommodity(): Promise<boolean> {
        try {
            await this.Addcommodity.click();
            console.log("Add commodity button clicked......!");
            return true; // Return true if the button is clicked successfully
        } catch (error) {
            console.error("Error while clicking on Add commodity button:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async enterCommodityDetails(commodityName: string) {
        await this.commoditynameInput.fill(commodityName);

    }


    async clickonCommoditySavebtn() {
        await this.savebtn.click();
        console.log("Commodity Created Successfully")
    }



}

export default CreateCommodity;

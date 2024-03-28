import { Page, expect } from '@playwright/test';

class CreateCommodity {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async commodityNavigation(): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Commodities-icon Commodities' }).click();
            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/commodities');
            return true; // Navigation successful
        } catch (error) {
            console.error('Error occurred during commodity navigation:', error);
            //  throw new Error("Error during commodity navigation: " + error); // Mark the test as failed
            return false;
        }
    }

    async addcommodity(CommodityName: string): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Add Commodity' }).click();

            await this.page.getByLabel('Name').click();
            await this.page.getByLabel('Name').fill(CommodityName);

            await this.page.getByRole('button', { name: 'Save' }).click();

            await this.page.waitForTimeout(10000);

            return true; // Commodity added successfully
        } catch (error) {
            console.error('Error occurred while adding commodity:', error);
            //  throw new Error("Error during commodity addition: " + error); // Mark the test as failed
            return false;
        }
    }

    async checkcommodity(commodityNameValue: string): Promise<boolean> {
        try {
            const commodityList = await this.page.$$('//h4');

            if (commodityList.length > 0) {
                for (const element of commodityList) {
                    const commodityListText = await element.textContent();
                    if (commodityListText) { // Check if Commodity ListText is not null
                        console.log("Commodity Name ----------------> " + commodityListText);

                        if (commodityListText.trim().toLowerCase() === commodityNameValue.trim().toLowerCase()) {
                            console.log("Commodity Created ----------------> " + commodityNameValue);
                            return true; // Commodity found
                        }
                    }
                }
                console.log("Commodity Not Found In List ----------------> " + commodityNameValue);
                return false; // Commodity not found
            } else {
                console.log("Commodity Data Not Found ----------------> " + commodityNameValue);
                return false; // Commodity list is empty
            }
        } catch (error) {
            console.error("Error while checking commodity:", error);
            // throw new Error("Error while checking commodity: " + error); // Mark the test as failed
            return false;
        }
    }
}

export default CreateCommodity;

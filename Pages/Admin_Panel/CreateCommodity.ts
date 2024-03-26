import { expect, Locator, Page } from '@playwright/test';

class CreateCommodity {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async commodityNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Commodities-icon Commodities' }).click();
        
            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/commodities');
       
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Commodity:', error);
            return false; // Return false if any error occurred while entering details
        }
    }


    async addcommodity(CommodityName: string): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Add Commodity' }).click();

            await this.page.getByLabel('Name').click();
            await this.page.getByLabel('Name').fill(CommodityName);

            await this.page.getByRole('button', { name: 'Save' }).click();
            
            await this.page.waitForTimeout(10000);

            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Commodities:', error);
            return false; // Return false if any error occurred while entering details
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
                            return true; // Return true when Commodity is found
                        }
                    }
                }
                console.log("Commodity Not Found In List ----------------> " + commodityNameValue);
                return false; // Return false if Commodity is not found
            } else {
                console.log("Commodity Data Not Found ----------------> " + commodityNameValue);
                return false; // Return false if Commodity list is empty
            }
        } catch (error) {
            console.error("Error while checking Commodity:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}export default CreateCommodity;














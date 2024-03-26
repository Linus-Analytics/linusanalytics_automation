import { Locator, Page } from '@playwright/test';

class CreateCommodity {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async commodityNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Commodities-icon Commodities' }).click();
            let expectedURL = 'https://staging-app.linusanalytics.com/admin/commodities';
            await this.verifyNavigation(expectedURL);
            // console.log('Successfully navigated to Commodities tab');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Commodity:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            return currentURL === url; // Return true if the current URL matches the expected URL
        } catch (error) {
            console.error('Error occurred while adding Commodities:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async addcommodity(CommodityName: string): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Add Commodity' }).click();

            await this.page.getByLabel('Name').click();
            await this.page.getByLabel('Name').fill(CommodityName);

            await this.page.getByRole('button', { name: 'Save' }).click();
            
            await this.page.waitForTimeout(5000);

            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Commodities:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async checkcommodity(MachineTypeNameValue: string): Promise<boolean> {
        try {

            const machinetypeList = await this.page.$$('//h4');

            if (machinetypeList.length > 0) {
                for (const element of machinetypeList) {
                    const machinetypeListText = await element.textContent();
                    if (machinetypeListText) { // Check if Commodity ListText is not null
                        console.log("Commodity Name ----------------> " + machinetypeListText);

                        if (machinetypeListText.trim().toLowerCase() === MachineTypeNameValue.trim().toLowerCase()) {
                            console.log("Commodity Created ----------------> " + MachineTypeNameValue);
                            return true; // Return true when Commodity is found
                        }
                    }
                }
                console.log("Commodity Not Found In List ----------------> " + MachineTypeNameValue);
                return false; // Return false if Commodity is not found
            } else {
                console.log("Commodity Data Not Found ----------------> " + MachineTypeNameValue);
                return false; // Return false if Commodity list is empty
            }
        } catch (error) {
            console.error("Error while checking Commodity:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}export default CreateCommodity;














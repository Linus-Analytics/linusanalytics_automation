import { expect, Locator, Page } from '@playwright/test';

class CreateBin {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async binNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Bins-icon Bins' }).click();
            let expectedURL = 'https://staging-app.linusanalytics.com/admin/bins';
            // await this.verifyNavigation(expectedURL);
            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/bins');
            // console.log('Successfully navigated to Bins tab');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Bins:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    // async verifyNavigation(url: string): Promise<boolean> {
    //     try {
    //         const currentURL = this.page.url(); // Get the current URL
    //         return currentURL === url; // Return true if the current URL matches the expected URL
    //     } catch (error) {
    //         console.error('Error occurred while adding Bins:', error);
    //         return false; // Return false if any error occurred while entering details
    //     }
    // }

    async addBin(customerName: string, facilityName: string, binName: string, binMax: string): Promise<boolean> {
        try {
            await this.binNavigation();
            await this.page.getByRole('button', { name: 'Add Bins' }).click();

            await this.page.getByLabel('Select Customer').click();
            await this.page.getByRole('option', { name: customerName }).click();
            
            await this.page.getByPlaceholder('Select Facility').click();
            await this.page.getByRole('option', { name: facilityName }).locator('div').first().click();

            await this.page.getByLabel('Name').click();
            await this.page.getByLabel('Name').fill(binName);

            await this.page.getByLabel('Max Capacity').click();
            await this.page.getByLabel('Max Capacity').fill(binMax);

            await this.page.getByRole('button', { name: 'Save' }).click();
            
            await this.page.waitForTimeout(5000);

            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Bin:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async checkbin(binNameValue: string): Promise<boolean> {
        try {

            const binList = await this.page.$$('//h4');

            if (binList.length > 0) {
                for (const element of binList) {
                    const binListText = await element.textContent();
                    if (binListText) { // Check if binListText is not null
                        console.log("Bin Name ----------------> " + binListText);

                        if (binListText.trim().toLowerCase() === binNameValue.trim().toLowerCase()) {
                            console.log("Bin Created ----------------> " + binNameValue);
                            return true; // Return true when Bin is found
                        }
                    }
                }
                console.log("Bin Not Found In List ----------------> " + binNameValue);
                return false; // Return false if Bin is not found
            } else {
                console.log("Bin Data Not Found ----------------> " + binNameValue);
                return false; // Return false if Bin list is empty
            }
        } catch (error) {
            console.error("Error while checking Bin:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}export default CreateBin;














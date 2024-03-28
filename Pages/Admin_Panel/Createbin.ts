import { Page, expect } from '@playwright/test';

class CreateBin {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async binNavigation(): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Bins-icon Bins' }).click();
            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/bins');
            return true; // Return true if navigation is successful
        } catch (error) {
            console.error('Error occurred during bin navigation:', error);
            // throw new Error("Error during bin navigation: " + error); // Mark the test as failed
            return false;
        }
    }

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

            return true; // Return true if bin is added successfully
        } catch (error) {
            console.error('Error occurred while adding bin:', error);
            // throw new Error("Error during bin creation: " + error); // Mark the test as failed
            return false;
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
                            return true; // Return true when bin is found
                        }
                    }
                }
                console.log("Bin Not Found In List ----------------> " + binNameValue);
                return false; // Return false if bin is not found
            } else {
                console.log("Bin Data Not Found ----------------> " + binNameValue);
                return false; // Return false if bin list is empty
            }
        } catch (error) {
            console.error("Error while checking bin:", error);
            // throw new Error("Error during bin validation: " + error); // Mark the test as failed
            return false;
        }
    }
}

export default CreateBin;

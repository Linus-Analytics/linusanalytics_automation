import { expect, Page } from '@playwright/test';

class CreateHopper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async hopperNavigation(): Promise<boolean> {
        try {
            console.log("Navigating to Hopper");
            await this.page.getByRole('button', { name: 'Hoppers-icon Hoppers' }).click();
            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/hoppers');
            console.log("Navigated to Hopper");
            return true; // Navigation successful
        } catch (error) {
            console.error('Error occurred during hopper navigation:', error);
            // throw new Error("Error during hopper navigation: " + error); // Mark the test as failed
            return false;
        }
    }

    async addHopper(customerName: string, facilityName: string, hopperName: string, hopperBin: string, hopperCommodity: string, machineName: string): Promise<boolean> {
        try {
            console.log("Adding Hopper .....");
            await this.page.getByRole('button', { name: 'Add Hopper' }).click();

            await this.page.getByLabel('Select Customer').click();
            await this.page.getByRole('option', { name: customerName }).click();

            await this.page.getByLabel('Select Facility').click();
            await this.page.getByRole('option', { name: facilityName }).locator('div').first().click();

            await this.page.getByLabel('Name').click();
            await this.page.getByLabel('Name').fill(hopperName);

            await this.page.getByLabel('Select Bin').click();
            await this.page.getByRole('option', { name: hopperBin }).click();

            await this.page.getByLabel('Select Commodity Type').click();
            await this.page.getByRole('combobox', { name: 'Select Commodity Type' }).fill(hopperCommodity);
            await this.page.locator('#commodity-option-0').click();

            await this.page.getByLabel('Select Machine').click();
            await this.page.getByRole('option', { name: machineName }).locator('div').first().click();

            await this.page.getByRole('button', { name: 'Save' }).click();
            await this.page.waitForTimeout(5000);
            return true; // Hopper added successfully
        } catch (error) {
            console.error('Error occurred while adding Hopper:', error);
            // throw new Error("Error during hopper addition: " + error); // Mark the test as failed
            return false;
        }
    }

    async checkhopper(hopperNameValue: string): Promise<boolean> {
        try {
            console.log("Checking Hopper .....");
            const hopperList = await this.page.$$('//h4');

            if (hopperList.length > 0) {
                for (const element of hopperList) {
                    const hopperListText = await element.textContent();
                    if (hopperListText) {
                        console.log("Hopper Name ----------------> " + hopperListText);

                        if (hopperListText.trim().toLowerCase() === hopperNameValue.trim().toLowerCase()) {
                            console.log("Hopper Created ----------------> " + hopperNameValue);
                            return true; // Hopper found
                        }
                    }
                }
                console.log("Hopper Not Found In List ----------------> " + hopperNameValue);
                return false; // Hopper not found
            } else {
                console.log("Hopper Data Not Found ----------------> " + hopperNameValue);
                return false; // Hopper list is empty
            }
        } catch (error) {
            console.error("Error while checking Hopper:", error);
            // throw new Error("Error while checking Hopper: " + error); // Mark the test as failed
            return false;
        }
    }
}

export default CreateHopper;

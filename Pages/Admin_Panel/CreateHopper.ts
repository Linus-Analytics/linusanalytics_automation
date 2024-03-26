import { expect, Locator, Page } from '@playwright/test';

class CreateHopper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async hopperNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Hoppers-icon Hoppers' }).click();

            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/hoppers');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Hopper:', error);
            return false; // Return false if any error occurred while entering details
        }
    }


    async addHopper(customerName: string, facilityName: string, hopperName:string ,  hopperBin:string , hopperCommodity: string, machineName: string): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Add Hopper' }).click();

            await this.page.getByLabel('Select Customer').click();
            await this.page.getByRole('option', { name: customerName }).click();

            await this.page.getByLabel('Select Facility').click();
            await this.page.getByRole('option', { name: facilityName }).locator('div').first().click();

            await this.page.getByLabel('Name').click();
            await this.page.getByLabel('Name').fill(hopperName);

            await this.page.getByLabel('Select Bin').click();
            await this.page.getByRole('option', { name: hopperBin }).click();

            await this.page.getByLabel('Select Machine').click();
            await this.page.getByRole('option', { name: machineName }).locator('div').first().click();

            await this.page.getByLabel('Select Commodity Type').click();
            await this.page.getByRole('option', { name: hopperCommodity }).click();

            await this.page.getByRole('button', { name: 'Save' }).click();

            await this.page.waitForTimeout(5000);
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Hopper:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async checkhopper(hopperNameValue: string): Promise<boolean> {
        try {

            const hopperList = await this.page.$$('//h4');

            if (hopperList.length > 0) {
                for (const element of hopperList) {
                    const hopperListText = await element.textContent();
                    if (hopperListText) { // Check if HopperListText is not null
                        console.log("Hopper Name ----------------> " + hopperListText);

                        if (hopperListText.trim().toLowerCase() === hopperNameValue.trim().toLowerCase()) {
                            console.log("Hopper Created ----------------> " + hopperNameValue);
                            return true; // Return true when Hopper is found
                        }
                    }
                }
                console.log("Hopper Not Found In List ----------------> " + hopperNameValue);
                return false; // Return false if Hopper is not found
            } else {
                console.log("Hopper Data Not Found ----------------> " + hopperNameValue);
                return false; // Return false if Hopper list is empty
            }
        } catch (error) {
            console.error("Error while checking Hopper:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}export default CreateHopper;














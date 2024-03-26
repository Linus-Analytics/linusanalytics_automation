import { expect, Locator, Page } from '@playwright/test';

class CreateScale {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async scaleNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Scales-icon Scales' }).click();

            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/scales');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Scales:', error);
            return false; // Return false if any error occurred while entering details
        }
    }


    async addScale(customerName: string, facilityName: string, scaleId: string, scaleName: string): Promise<boolean> {
        try {
            await this.scaleNavigation();
            await this.page.getByRole('button', { name: 'Scales-icon Scales' }).click();
            await this.page.getByRole('button', { name: 'Add Scales' }).click();

            await this.page.getByLabel('Select Customer').click();
            await this.page.getByRole('option', { name: customerName }).click();

            await this.page.getByPlaceholder('Select Facility').click();
            await this.page.getByRole('option', { name: facilityName }).locator('div').first().click();

            await this.page.getByLabel('ID').click();
            await this.page.getByLabel('ID').fill(scaleId);

            await this.page.getByRole('textbox', { name: 'Scale Name' }).click();
            await this.page.getByRole('textbox', { name: 'Scale Name' }).fill(scaleName);

            await this.page.getByRole('button', { name: 'Save' }).click();

            await this.page.waitForTimeout(5000);
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Scale:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async checkscale(scaleNameValue: string): Promise<boolean> {
        try {

            const scaleList = await this.page.$$('//h4');

            if (scaleList.length > 0) {
                for (const element of scaleList) {
                    const scaleListText = await element.textContent();
                    if (scaleListText) { // Check if scaleListText is not null
                        console.log("Scale Name ----------------> " + scaleListText);

                        if (scaleListText.trim().toLowerCase() === scaleNameValue.trim().toLowerCase()) {
                            console.log("Scale Created ----------------> " + scaleNameValue);
                            return true; // Return true when Scale is found
                        }
                    }
                }
                console.log("Scale Not Found In List ----------------> " + scaleNameValue);
                return false; // Return false if Scale is not found
            } else {
                console.log("Scale Data Not Found ----------------> " + scaleNameValue);
                return false; // Return false if Scale list is empty
            }
        } catch (error) {
            console.error("Error while checking Scale:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}export default CreateScale;














import { expect, Page } from '@playwright/test';

class CreateScale {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async scaleNavigation(): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Scales-icon Scales' }).click();
            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/scales');
            return true; // Navigation successful
        } catch (error) {
            console.error('Error occurred during scale navigation:', error);
            // throw new Error("Error during scale navigation: " + error); // Mark the test as failed
            return false;
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
            return true; // Scale added successfully
        } catch (error) {
            console.error('Error occurred while adding Scale:', error);
            // throw new Error("Error during adding scale: " + error); // Mark the test as failed
            return false;
        }
    }

    async checkscale(scaleNameValue: string): Promise<boolean> {
        try {
            await this.page.waitForTimeout(3000);
            const scaleList = await this.page.$$('//h4');

            if (scaleList.length > 0) {
                for (const element of scaleList) {
                    const scaleListText = await element.textContent();
                    if (scaleListText) {
                        console.log("Scale Name ----------------> " + scaleListText);

                        if (scaleListText.trim().toLowerCase() === scaleNameValue.trim().toLowerCase()) {
                            console.log("Scale Created ----------------> " + scaleNameValue);
                            return true; // Scale found
                        }
                    }
                }
                console.log("Scale Not Found In List ----------------> " + scaleNameValue);
                return false; // Scale not found
            } else {
                console.log("Scale Data Not Found ----------------> " + scaleNameValue);
                return false; // Scale list is empty
            }
        } catch (error) {
            console.error("Error while checking Scale:", error);
            //  throw new Error("Error during checking scale: " + error); // Mark the test as failed
            return false;
        }
    }
}

export default CreateScale;

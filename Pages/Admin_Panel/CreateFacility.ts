import { expect, Page } from '@playwright/test';

class CreateFacility {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async facilityNavigation(): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Facilities-icon Facilities' }).click();
            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/facilities');
            return true; // Navigation successful
        } catch (error) {
            console.error('Error occurred during facility navigation:', error);
           // throw new Error("Error during facility navigation: " + error); // Mark the test as failed
           return false;
        }
    }

    async addFacility(customerName: string, facilityName: string, contactName: string): Promise<boolean> {
        try {
            await this.facilityNavigation();

            await this.page.getByRole('button', { name: 'Facilities-icon Facilities' }).click();
            await this.page.getByRole('button', { name: 'Add Facility' }).click();

            await this.page.getByLabel('Select Customer').click();
            await this.page.getByRole('option', { name: customerName }).click();

            await this.page.getByLabel('Facility Name').click();
            await this.page.getByLabel('Facility Name').fill(facilityName);

            await this.page.getByLabel('Contact Name').click();
            await this.page.getByLabel('Contact Name').fill(contactName);

            await this.page.getByLabel('Same as Customer Address').check();

            await this.page.getByRole('button', { name: 'Save' }).click();

            console.log("Success entering Facility details");
            await this.page.waitForTimeout(5000);
            return true; // Facility added successfully
        } catch (error) {
            console.error('Error occurred while adding Facility:', error);
          //  throw new Error("Error during facility addition: " + error); // Mark the test as failed
          return false;
        }
    }

    async checkfacility(facilityNameValue: string): Promise<boolean> {
        try {
            const facilityList = await this.page.$$('//h4');

            if (facilityList.length > 0) {
                for (const element of facilityList) {
                    const facilityListText = await element.textContent();
                    if (facilityListText) {
                        console.log("Facility Name ----------------> " + facilityListText);

                        if (facilityListText.trim().toLowerCase() === facilityNameValue.trim().toLowerCase()) {
                            console.log("Facility Created ----------------> " + facilityNameValue);
                            return true; // Facility found
                        }
                    }
                }
                console.log("Facility Not Found In List ----------------> " + facilityNameValue);
                return false; // Facility not found
            } else {
                console.log("Facility Data Not Found ----------------> " + facilityNameValue);
                return false; // Facility list is empty
            }
        } catch (error) {
            console.error("Error while checking Facility:", error);
          //  throw new Error("Error while checking Facility: " + error); // Mark the test as failed
          return false;
        }
    }
}

export default CreateFacility;

import { Locator, Page } from '@playwright/test';

class CreateFacility {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async facilityNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Facilities-icon Facilities' }).click();
            let expectedURL = 'https://staging-app.linusanalytics.com/admin/facilities'
            await this.verifyNavigation(expectedURL)
            console.log('Successfully navigated to Facility tab');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Facility:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            return currentURL === url; // Return true if the current URL matches the expected URL
        } catch (error) {
            console.error('Error occurred while adding Facility:', error);
            return false; // Return false if any error occurred while entering details
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
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Facility:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async checkfacility(facilityNameValue: string): Promise<boolean> {
        try {

            const facilityList = await this.page.$$('//h4');

            if (facilityList.length > 0) {
                for (const element of facilityList) {
                    const facilityListText = await element.textContent();
                    if (facilityListText) { // Check if facilityListText is not null
                        console.log("Facility Name ----------------> " + facilityListText);

                        if (facilityListText.trim().toLowerCase() === facilityNameValue.trim().toLowerCase()) {
                            console.log("Facility Created ----------------> " + facilityNameValue);
                            return true; // Return true when facility is found
                        }
                    }
                }
                console.log("Facility Not Found In List ----------------> " + facilityNameValue);
                return false; // Return false if Facility is not found
            } else {
                console.log("Facility Data Not Found ----------------> " + facilityNameValue);
                return false; // Return false if Facility list is empty
            }
        } catch (error) {
            console.error("Error while checking Facility:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}export default CreateFacility;

   
   



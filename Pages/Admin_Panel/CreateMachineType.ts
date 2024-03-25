import { Locator, Page } from '@playwright/test';

class CreateMachineType {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async machinetypeNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Machine Types-icon Machine Types' }).click();
            let expectedURL = 'https://staging-app.linusanalytics.com/admin/machineTypes';
            await this.verifyNavigation(expectedURL);
            // console.log('Successfully navigated to Machine Type tab');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Machine Type:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            return currentURL === url; // Return true if the current URL matches the expected URL
        } catch (error) {
            console.error('Error occurred while adding Machine Type:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async addMachineType(MachineTypeName: string): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Add Machine Types' }).click();

            await this.page.getByLabel('Name').click();
            await this.page.getByLabel('Name').fill(MachineTypeName);

            await this.page.getByRole('button', { name: 'Save' }).click();
            
            await this.page.waitForTimeout(5000);

            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Machine Type:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async checkmachinetype(MachineTypeNameValue: string): Promise<boolean> {
        try {

            const machinetypeList = await this.page.$$('//h4');

            if (machinetypeList.length > 0) {
                for (const element of machinetypeList) {
                    const machinetypeListText = await element.textContent();
                    if (machinetypeListText) { // Check if Machine TypeListText is not null
                        console.log("Machine Type Name ----------------> " + machinetypeListText);

                        if (machinetypeListText.trim().toLowerCase() === MachineTypeNameValue.trim().toLowerCase()) {
                            console.log("Machine Type Created ----------------> " + MachineTypeNameValue);
                            return true; // Return true when Machine Type is found
                        }
                    }
                }
                console.log("Machine Type Not Found In List ----------------> " + MachineTypeNameValue);
                return false; // Return false if machinetype is not found
            } else {
                console.log("Machine Type Data Not Found ----------------> " + MachineTypeNameValue);
                return false; // Return false if machinetype list is empty
            }
        } catch (error) {
            console.error("Error while checking Machine Type:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}export default CreateMachineType;














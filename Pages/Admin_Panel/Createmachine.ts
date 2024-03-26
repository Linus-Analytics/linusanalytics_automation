import { expect, Locator, Page } from '@playwright/test';

class CreateMachine {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async machineNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Machines-icon Machines' }).click();

            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/machines');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Machine:', error);
            return false; // Return false if any error occurred while entering details
        }
    }


    async addMachine(customerName: string, facilityName: string, machineName: string,  machineType: string): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Add Machine' }).click();

            await this.page.getByLabel('Select Customer').click();
            await this.page.getByRole('option', { name: customerName }).click();

            await this.page.getByLabel('Select Facility').click();
            await this.page.getByRole('option', { name: facilityName }).locator('div').first().click();

            await this.page.getByLabel('Machine Name').click();
            await this.page.getByLabel('Machine Name').fill(machineName);

            await this.page.getByLabel('Select Machine Type').click();
            await this.page.getByRole('option', { name: machineType, exact: true }).click();

            await this.page.getByRole('button', { name: 'Save' }).click();

            await this.page.waitForTimeout(5000);
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Machine:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async checkmachine(machineNameValue: string): Promise<boolean> {
        try {

            const machineList = await this.page.$$('//h4');

            if (machineList.length > 0) {
                for (const element of machineList) {
                    const machineListText = await element.textContent();
                    if (machineListText) { // Check if MachineListText is not null
                        console.log("Machine Name ----------------> " + machineListText);

                        if (machineListText.trim().toLowerCase() === machineNameValue.trim().toLowerCase()) {
                            console.log("Machine Created ----------------> " + machineNameValue);
                            return true; // Return true when Machine is found
                        }
                    }
                }
                console.log("Machine Not Found In List ----------------> " + machineNameValue);
                return false; // Return false if Machine is not found
            } else {
                console.log("Machine Data Not Found ----------------> " + machineNameValue);
                return false; // Return false if Machine list is empty
            }
        } catch (error) {
            console.error("Error while checking Machine:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}export default CreateMachine;














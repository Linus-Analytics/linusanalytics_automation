import { expect, Page } from '@playwright/test';

class CreateMachineType {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async machinetypeNavigation(): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Machine Types-icon Machine Types' }).click();
            await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/admin/machineTypes');
            return true; // Navigation successful
        } catch (error) {
            console.error('Error occurred during machine type navigation:', error);
            // throw new Error("Error during machine type navigation: " + error); // Mark the test as failed
            return false;
        }
    }

    async addMachineType(MachineTypeName: string): Promise<boolean> {
        try {
            await this.page.getByRole('button', { name: 'Add Machine Types' }).click();

            await this.page.getByLabel('Name').click();
            await this.page.getByLabel('Name').fill(MachineTypeName);

            await this.page.getByRole('button', { name: 'Save' }).click();

            await this.page.waitForTimeout(5000);

            return true; // Machine type added successfully
        } catch (error) {
            console.error('Error occurred while adding Machine Type:', error);
            // throw new Error("Error during adding machine type: " + error); // Mark the test as failed
            return false;
        }
    }

    async checkmachinetype(MachineTypeNameValue: string): Promise<boolean> {
        try {
            const machinetypeList = await this.page.$$('//h4');

            if (machinetypeList.length > 0) {
                for (const element of machinetypeList) {
                    const machinetypeListText = await element.textContent();
                    if (machinetypeListText) {
                        console.log("Machine Type Name ----------------> " + machinetypeListText);

                        if (machinetypeListText.trim().toLowerCase() === MachineTypeNameValue.trim().toLowerCase()) {
                            console.log("Machine Type Created ----------------> " + MachineTypeNameValue);
                            return true; // Machine type found
                        }
                    }
                }
                console.log("Machine Type Not Found In List ----------------> " + MachineTypeNameValue);
                return false; // Machine type not found
            } else {
                console.log("Machine Type Data Not Found ----------------> " + MachineTypeNameValue);
                return false; // Machine type list is empty
            }
        } catch (error) {
            console.error("Error while checking Machine Type:", error);
            // throw new Error("Error during checking machine type: " + error); // Mark the test as failed
            return false;
        }
    }
}

export default CreateMachineType;

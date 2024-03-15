import { Locator, Page } from '@playwright/test';

interface commodityData {
    commodityName: string;
    
}

class CreateMachineType {


    private page: Page;
    // private MachineTypeName: Locator;
    private savebtn: Locator;
    private MachineTypenameInput: Locator;
    private AddMachineType: Locator;

    constructor(page: Page) {
        this.page = page;
        this.AddMachineType = page.locator("//*[contains(text(),'Add Machine Types')]");
        this.MachineTypenameInput = page.locator("//input[@name='name']");
        this.savebtn = page.locator("//*[contains(text(),'Save')]");

    }


    async MachineTypeNavigation(): Promise<boolean> {
        try {
            await this.page.goto("https://staging-app.linusanalytics.com/admin/machineTypes/");
            // await this.page.waitForTimeout(10000);
            if (await this.page.waitForSelector('//nav/div/div/div/div/p[contains(text(),"Machine Type")]', { state: 'visible' })) {
                console.log("User navigates to Machine Type tab");

                return true; // Return true if the Machine Type tab is visible
            } else {
                console.log("User failed to navigate to Machine Type tab");
                return false; // Return false if the Machine Type tab is not visible
            }
        } catch (error) {
            console.error("Error during Machine Type navigation:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickAddMachineType(): Promise<boolean> {
        try {
            await this.AddMachineType.click();
            console.log("Add Machine Type button clicked......!");
            return true; // Return true if the button is clicked successfully
        } catch (error) {
            console.error("Error while clicking on Add Machine Type button:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async enterMachineTypeDetails(machinetype: string) {
        await this.MachineTypenameInput.fill(machinetype);

    }


    async clickonMachineTypeSavebtn() {
        await this.savebtn.click();
        console.log("Machine Type Created Successfully")
    }



}

export default CreateMachineType;

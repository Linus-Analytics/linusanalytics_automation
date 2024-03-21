import { Locator, Page } from 'playwright';

interface MachinetypeData {

    machinetypeName: string;
}

class CreateMachine {
    private page: Page;
    private AddMachine: Locator;
    private customername: Locator;
    private facilityname: Locator;
    private MachineTypename: Locator;
    private machinenameinput: Locator
    selectCustomerName!: Locator;
    selectFacilityName!: Locator;
    selectMachineTypeName!: Locator;
    private savebtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.AddMachine = page.locator("//*[contains(text(),'Add Machine')]");
        this.customername = page.locator("//input[@id='customer']"); // /div/button/img[@src='/_next/static/media/select_arrow.b1f6ceaf.svg']
        this.facilityname = page.locator("//input[@id='facility']");
        this.MachineTypename = page.locator("//input[@id='machineType']");
        this.machinenameinput = page.locator("//input[@name='name']");
        this.savebtn = page.locator("//*[contains(text(),'Save')]");
    }

    async MachineNavigation(): Promise<boolean> {
        try {
            await this.page.goto("https://staging-app.linusanalytics.com/admin/machines/");
            // await this.page.waitForTimeout(10000);
            if (await this.page.waitForSelector('//nav/div/div/div/div/p[contains(text(),"Machine")]', { state: 'visible' })) {
                console.log("User navigates to Machine tab");
                return true; // Return true if the Machine tab is visible
            } else {
                console.log("User failed to navigate to Machine tab");
                return false; // Return false if the Machine tab is not visible
            }
        } catch (error) {
            console.error("Error during Machine navigation:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickAddMachine(): Promise<boolean> {
        try {
            await this.AddMachine.click();
            console.log("Add Machine button clicked......!");
            return true; // Return true if the button is clicked successfully
        } catch (error) {
            console.error("Error while clicking on Add Machine button:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickMachineCustomer(customerNameValue: string, page: Page) {
        await this.customername.click();
        this.selectCustomerName = page.locator(`//ul[@id="customer-listbox"]/li/p[contains(text(),"${customerNameValue}")]`);
        await this.selectCustomerName.click();

    }

    async clickMachineFacility(facilityNameValue: string, page: Page) {
        await this.facilityname.click();
        this.selectFacilityName = page.locator(`//ul[@id="facility-listbox"]/li/div/div/div/p[contains(text(),"${facilityNameValue}")]`);
        await this.selectFacilityName.click();
    }

    async clickMachineMachineType(MachineTypeNameValue: string, page: Page) {
        await this.MachineTypename.click();
        this.selectMachineTypeName = page.locator(`//ul[@id="machineType-listbox"]/li/p[contains(text(),"${MachineTypeNameValue}")]`);
        await this.selectMachineTypeName.click();
    }

    async enterMachineDetails(machineNameValue: string) {
        await this.machinenameinput.fill(machineNameValue);
    }

    async clickonMachineSavebtn() {
        await this.savebtn.click();
        console.log("Machine Created Successfully")
    }


}

export default CreateMachine;

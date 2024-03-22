import { Locator, Page } from 'playwright';

interface binData {

    binName: string;
    maxCapacity: string;
    capacityThreshold: string;

}

class CreateBin {
    private page: Page;
    private binicon: Locator;
    private Addbin: Locator;
    private customername: Locator;
    private facilityname: Locator;
    selectCustomerName!: Locator;
    selectFacilityName!: Locator;

    // private binclridinput: Locator;
    private binnameinput: Locator;
    private binmaxcapacity: Locator; // You can specify the type of maxcapacity and capacitythreshold if needed
    // private capacitythreshold: Locator;
    private savebtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.binicon = page.locator("//img[@alt='Bins-icon']");
        this.Addbin = page.locator("//*[contains(text(),'Add Bin')]");
        this.customername = page.locator("//input[@id='customer']"); // /div/button/img[@src='/_next/static/media/select_arrow.b1f6ceaf.svg']
        this.facilityname = page.locator("//input[@id='facilities']");
        // this.binclridinput = page.locator("//input[@name='color']");
        this.binnameinput = page.locator("//input[@name='name']");
        this.binmaxcapacity = page.locator("//input[@name='capacity']");
        // this.capacitythreshold = page.locator("");
        this.savebtn = page.locator("//*[contains(text(),'Save')]");
    }

    async binNavigation(): Promise<boolean> {
        try {
            await this.page.goto("https://staging-app.linusanalytics.com/admin/bins/");
            // await this.page.waitForTimeout(10000);
            if (await this.page.waitForSelector('//nav/div/div/div/div/p[contains(text(),"Bins")]', { state: 'visible' })) {
                console.log("User navigates to Bin tab");
                return true; // Return true if the Bin tab is visible
            } else {
                console.log("User failed to navigate to Bin tab");
                return false; // Return false if the Bin tab is not visible
            }
        } catch (error) {
            console.error("Error during Bin navigation:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickAddBin(): Promise<boolean> {
        try {
            await this.Addbin.click();
            console.log("Add Bin button clicked......!");
            return true; // Return true if the button is clicked successfully
        } catch (error) {
            console.error("Error while clicking on Add Bin button:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickBinCustomer(customerName: string, page: Page) {
        await this.customername.click();
        this.selectCustomerName = page.locator(`//ul[@id="customer-listbox"]/li/p[contains(text(),"${customerName}")]`);
        await this.selectCustomerName.click();

    }

    async clickBinFacility(facilityName: string, page: Page) {
        await this.facilityname.click();
        this.selectFacilityName = page.locator(`//ul[@id="facilities-listbox"]/li/div/div/div/p[1][contains(text(),"${facilityName}")]`);
        await this.selectFacilityName.click();
    }

    async enterBinDetails(binNameValue: string, maxCapacity: string) {
        await this.binnameinput.fill(binNameValue);
        await this.binmaxcapacity.fill(maxCapacity);
    }

    async clickonbinSavebtn() {
        await this.savebtn.click();
        console.log("Bin Created Successfully")
    }

    // async BinCreate(binclrid: string, name: string) {
    //     await this.page.locator(this.binclridinput).fill(binclrid);
    //     await this.page.locator(this.binnameinput).fill(name);
    // }

    // async clickbinicon() {
    //     await this.page.locator(this.binicon).click();
    // }

    // async clickaddbin() {
    //     await this.page.locator(this.addbin).click();
    // }

    // async clickonbinsavebtn() {
    //     await this.page.locator(this.savebtn).click();
    // }
}

export default CreateBin;

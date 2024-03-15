import { Locator, Page } from '@playwright/test';

interface FacilityData {
    facilityCustomerName: string;
    facilityCity: string;
    facilityCountry: string;
    facilityState: string;
    facilityWeight: string;
}

class CreateFacility {

    private page: Page;
    private facilityicon: Locator;
    private Addfacility: Locator;
    private facilitynameInput: Locator;
    private contactName: Locator;
    private btn_toggle: Locator;
    private street1Input: Locator;
    private street2Input: Locator;
    private zipcodeInput: Locator;
    private customername: Locator;
    private facilityText: Locator;
    private savebtn: Locator;
    selectCustomerName!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.facilityicon = page.locator("//img[@alt='Facilities-icon']");
        this.Addfacility = page.locator("//*[contains(text(),'Add Facility')]");
        this.facilitynameInput = page.locator("//div/label[contains(text(),'Facility Name')]");
        this.contactName = page.locator("//div/label[contains(text(),'Contact Name')]");
        this.btn_toggle = page.locator("//span[@class='MuiSwitch-root MuiSwitch-sizeMedium mui-9vz763']");
        this.street1Input = page.locator("//input[@placeholder='Street Address 1']");
        this.street2Input = page.locator("//input[@name='streetAddress2']");
        this.zipcodeInput = page.locator("//input[@placeholder='Zip Code']");
        this.customername = page.locator("//button/img[@src='/_next/static/media/select_arrow.b1f6ceaf.svg']");
        this.facilityText = page.locator("//*[contains(text(),'Add Facility')]");
        this.savebtn = page.locator("//*[contains(text(),'Save')]");

    }

    async facilityNavigation(): Promise<boolean> {
        try {
            await this.page.goto("https://staging-app.linusanalytics.com/admin/facilities/");
            // await this.page.waitForTimeout(10000);
            if (await this.page.waitForSelector('//nav/div/div/div/div/p[contains(text(),"Facilities")]', { state: 'visible' })) {
                console.log("User navigates to facility tab");

                return true; // Return true if the facility tab is visible
            } else {
                console.log("User failed to navigate to facility tab");
                return false; // Return false if the facility tab is not visible
            }
        } catch (error) {
            console.error("Error during facility navigation:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async clickAddFacility(): Promise<boolean> {
        try {
            await this.Addfacility.click();
            console.log("Add facility button clicked......!");
            return true; // Return true if the button is clicked successfully
        } catch (error) {
            console.error("Error while clicking on Add facility button:", error);
            return false; // Return false if any error occurs during the process
        }
    }

    async enterFacilityDetails(facilityName: string, contactName: string) {
        await this.facilitynameInput.fill(facilityName);
        await this.contactName.fill(contactName);
        await this.btn_toggle.click()

    }

    async clickFacilityCustomer(customerName: string, page: Page) {
        await this.customername.click();
        this.selectCustomerName = page.locator(`//ul[@id="customer-listbox"]/li/p[contains(text(),"${customerName}")]`);
        await this.selectCustomerName.click();

    }

    async clickonFacilitySavebtn() {
        await this.savebtn.click();
        console.log("Facility Created Successfully")
    }

}

export default CreateFacility;

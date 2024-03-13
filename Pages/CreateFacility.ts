import { Console } from 'console';
import testData from '../testData';
import CreateCustomer from './CreateCustomer';
import { Locator, Page } from '@playwright/test';

interface FacilityData {
    facilityCustomerName: string;
    facilityCity: string;
    facilityCountry: string;
    facilityState: string;
    facilityWeight: string;
}

class CreateFacility {

    
    private page: Page; // You should replace `any` with the appropriate type if possible
    private facilityicon: Locator;
    private Addfacility: Locator;
    private facilitynameInput: Locator;
    private contactName: Locator;
    private switch: Locator;
    private street1Input: Locator;
    private street2Input: Locator;
    private zipcodeInput: Locator;
    private customername: Locator;
    private country: Locator;
    private state: Locator;
    private city: Locator;
    private weight: Locator;
    private selectCustomerName: Locator;
    // private selectedcountry: Locator;
    // private selectedstate: Locator;
    // private selectedcity: Locator;
    // private selectedWeight: Locator;
    private facilityText: Locator;
    private savebtn: Locator;

    constructor(page: Page) { // You should replace `any` with the appropriate type if possible
        this.page = page;
        const { facilityCustomerName }: FacilityData = testData.facilityData  // ,facilityCountry, facilityState, facilityCity, facilityWeight

        this.facilityicon = page.locator("//img[@alt='Facilities-icon']");
        this.Addfacility = page.locator("//*[contains(text(),'Add Facility')]");
        this.facilitynameInput = page.locator("//div/label[contains(text(),'Facility Name')]");
        this.contactName = page.locator("//div/label[contains(text(),'Contact Name')]");
        this.switch = page.locator("//span[@class='MuiSwitch-root MuiSwitch-sizeMedium mui-9vz763']");
        this.street1Input = page.locator("//input[@placeholder='Street Address 1']");
        this.street2Input = page.locator("//input[@name='streetAddress2']");
        this.zipcodeInput = page.locator("//input[@placeholder='Zip Code']");
        this.customername = page.locator("//button/img[@src='/_next/static/media/select_arrow.b1f6ceaf.svg']");
        this.country = page.locator("//div[@id='mui-component-select-country']");
        this.state = page.locator("//div[@id='mui-component-select-state']");
        this.city = page.locator("//div[@id='mui-component-select-city']");
        this.weight = page.locator("//div[@id='mui-component-select-weight']");
        this.selectCustomerName = page.locator(`//*[contains(text(),"${facilityCustomerName}")]`);
        // this.selectedcountry = page.locator(`//li[@data-value="${facilityCountry}"]`);
        // this.selectedstate = page.locator(`//li[@data-value="${facilityState}"]`);
        // this.selectedcity = page.locator(`//li[@data-value="${facilityCity}"]`);
        // this.selectedWeight = page.locator(`//li[@data-value="${facilityWeight}"]`);
        this.facilityText = page.locator("//*[contains(text(),'Add Facility')]");
        this.savebtn = page.locator("//*[contains(text(),'Save')]");
    }

    async enterFacilityDetails(facilityName: string, contactName:string ) {  // , facilityStreet1: string, facilityStreet2: string, facilityZipCode: string 
        await this.facilitynameInput.fill(facilityName);
        await this.contactName.fill(contactName);
        await this.switch.click()
        // await this.street1Input.fill(facilityStreet1);
        // await this.street2Input.fill(facilityStreet2);
        // await this.zipcodeInput.fill(facilityZipCode);
    }

    async clickAddFacility() {
        await this.Addfacility.click();
    }

    // async selectFacilityCountry() {
    //     await this.country.click();
    //     await this.selectedcountry.click();
    // }

    // async selectFacilityCity() {
    //     await this.city.click();
    //     await this.selectedcity.click();
    // }

    async verificationgranted() {
        return await this.facilityText.isVisible();
    }

    // async selecteFacilitystate() {
    //     await this.state.click();
    //     await this.selectedstate.click();
    // }

    async clickFacilityCustomer() {
        await this.customername.click();
        await 
        await this.selectCustomerName.click();
    }

    // async selectFacilityweight() {
    //     await this.weight.click();
    //     await this.selectedWeight.click();
    // }

    async clickonFacilitySavebtn() {
        await this.savebtn.click();
        console.log("Facility Created Successfully")
    }

    async facilityNavigation() {
        await this.page.goto("https://staging-app.linusanalytics.com/admin/facilities/");
        // await this.page.waitForTimeout(10000);
        await this.page.waitForLoadState('networkidle');
    }
}

export default CreateFacility;

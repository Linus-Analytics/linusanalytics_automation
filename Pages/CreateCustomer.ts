import { Page } from '@playwright/test';

class CreateCustomer {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async customerNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Customers-icon Customers' }).click();
            let expectedURL = 'https://staging-app.linusanalytics.com/admin/customers'
            await this.verifyNavigation(expectedURL)
            console.log('Successfully navigated to Customer tab');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding customer:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            return currentURL === url; // Return true if the current URL matches the expected URL
        } catch (error) {
            console.error('Error occurred while adding customer:', error);
            return false; // Return false if any error occurred while entering details
        }
    }
    async addCustomer(customerName: string, C_streetAddress1: string, C_streetAddress2: string, C_countryName: string, C_state: string, C_city: string, C_zipCode: string, C_phoneNumber: string): Promise<boolean> {
        try {
            await this.customerNavigation();
            await this.page.getByRole('button', { name: 'Customers-icon Customers' }).click();
            await this.page.waitForSelector('button:has-text("Add Customer")');
            await this.page.click('button:has-text("Add Customer")');

            await this.page.getByLabel('Customer Name').fill(customerName);

            await this.page.getByLabel('Street Address 1').fill(C_streetAddress1);
            await this.page.getByLabel('Street Address 2').fill(C_streetAddress2);

            await this.page.getByLabel('Country').click();
            await this.page.getByRole('combobox', { name: 'Country' }).fill(C_countryName);
            await this.page.getByText(C_countryName, { exact: true }).click();

            await this.page.getByLabel('State').click();
            await this.page.getByRole('combobox', { name: 'State' }).fill(C_state);
            await this.page.getByText(C_state, { exact: true }).click();

            await this.page.getByLabel('City', { exact: true }).click();
            await this.page.getByRole('combobox', { name: 'City' }).fill(C_city);
            await this.page.getByText(C_city, { exact: true }).click();

            await this.page.getByLabel('Zip Code').click();
            await this.page.getByLabel('Zip Code').fill(C_zipCode);
            await this.page.getByLabel('Phone Number').click();
            await this.page.getByLabel('Phone Number').fill(C_phoneNumber);
            await this.page.getByRole('button', { name: 'Save' }).click();

            console.log("Success entering customer details");

            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding customer:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async checkCustomer(customerNameValue: string): Promise<boolean> {
        try {

            const customerList = await this.page.$$('//h4');

            if (customerList.length > 0) {
                for (const element of customerList) {
                    const customerListText = await element.textContent();
                    if (customerListText) { // Check if customerListText is not null
                        console.log("Customer Name ----------------> " + customerListText);

                        if (customerListText.trim().toLowerCase() === customerNameValue.trim().toLowerCase()) {
                            console.log("Customer Created ----------------> " + customerNameValue);
                            return true; // Return true when customer is found
                        }
                    }
                }
                console.log("Customer Not Found In List ----------------> " + customerNameValue);
                return false; // Return false if customer is not found
            } else {
                console.log("Customer Data Not Found ----------------> " + customerNameValue);
                return false; // Return false if customer list is empty
            }
        } catch (error) {
            console.error("Error while checking customer:", error);
            return false; // Return false if any error occurs during the process
        }
    }
}

export default CreateCustomer;


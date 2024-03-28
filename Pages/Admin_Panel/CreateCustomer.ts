import { Page, expect } from '@playwright/test';

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
            return true; // Navigation successful
        } catch (error) {
            console.error('Error occurred during customer navigation:', error);
            // throw new Error("Error during customer navigation: " + error); // Mark the test as failed
            return false;
        }
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            currentURL === url; // Return true if the current URL matches the expected URL
            console.log('Successfully navigated to url ::' + url); // Log the result
            return true;
        } catch (error) {
            console.error('Error occurred while verifying navigation:', error);
            // throw new Error("Error while verifying navigation: " + error); // Mark the test as failed
            return false;
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
            await this.page.waitForTimeout(5000);

            return true; // Customer added successfully
        } catch (error) {
            console.error('Error occurred while adding customer:', error);
            //  throw new Error("Error during customer addition: " + error); // Mark the test as failed
            return false;
        }
    }

    async checkCustomer(customerNameValue: string): Promise<boolean> {
        try {
            await this.page.waitForTimeout(3000);
            const customerList = await this.page.$$('//h4');

            if (customerList.length > 0) {
                for (const element of customerList) {
                    const customerListText = await element.textContent();
                    if (customerListText) { // Check if customerListText is not null
                        console.log("Customer Name ----------------> " + customerListText);

                        if (customerListText.trim().toLowerCase() === customerNameValue.trim().toLowerCase()) {
                            console.log("Customer Created ----------------> " + customerNameValue);
                            // await element.click();
                            return true; // Customer found
                        }
                    }
                }
                console.log("Customer Not Found In List ----------------> " + customerNameValue);
                return false; // Customer not found
            } else {
                console.log("Customer Data Not Found ----------------> " + customerNameValue);
                return false; // Customer list is empty
            }
        } catch (error) {
            console.error("Error while checking customer:", error);
            // throw new Error("Error while checking customer: " + error); // Mark the test as failed
            return false;
        }
    }

    async clickOnCustomerDetail(customerNameValue: string) {
        try {
            await this.page.getByLabel(customerNameValue, { exact: true }).click();
            const locator = await this.page.getByRole('heading', { name: customerNameValue, exact: true });
            await expect(locator).toHaveText(customerNameValue);
        } catch (error) {
            console.error("Error while clicking on customer detail:", error);
            // throw new Error("Error while clicking on customer detail: " + error); // Mark the test as failed
            return false;

        }
    }
}

export default CreateCustomer;
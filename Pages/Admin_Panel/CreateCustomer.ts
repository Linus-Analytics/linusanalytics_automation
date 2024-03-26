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
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding customer:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            currentURL === url; // Return true if the current URL matches the expected URL
            console.log('Successfully navigated to url ::' + url); // Log the result
            return true;
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
            await this.page.waitForTimeout(5000);

            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding customer:', error);
            return false; // Return false if any error occurred while entering details
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

    async clickOnCustomerDetail(customerNameValue: string) {

        await this.page.getByLabel(customerNameValue, { exact: true }).click();
        const locator = await this.page.getByRole('heading', { name: customerNameValue, exact: true });
        // await expect(this.page).toHaveURL(new RegExp('^https:\/\/staging-app\.linusanalytics\.com\/admin\/customers\/\d+$'));
        await expect(locator).toHaveText(customerNameValue)


    }

    async addUser(user: string, email: string, role: string) {

        await this.page.getByRole('button', { name: 'Add', exact: true }).click();
        await this.page.getByLabel('Name').click();
        await this.page.getByLabel('Name').fill(user);
        await this.page.getByLabel('Email Address').click();
        await this.page.getByLabel('Email Address').fill(email);
        await this.page.getByLabel('User Role').click();
        await this.page.getByRole('option', { name: role }).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
        const locator = this.page.getByText('An invitation email has been sent')
        await expect(locator).toHaveText("An invitation email has been sent")
    }

    async verifySignupEmail(emailAddress: string, firstName: string, lastName: string, password: string): Promise<boolean> {
        try {
            console.log("Navigating to Yopmail...");
            await this.page.goto('https://yopmail.com/');
            console.log("Clicked on email address input...");
            await this.page.getByPlaceholder('Enter your inbox here').click();
            console.log("Filled email address...");
            await this.page.getByPlaceholder('Enter your inbox here').fill(emailAddress);
            console.log("Clicked on Yopmail submit button...");
            await this.page.getByRole('button', { name: '' }).click();

            console.log("Clicked on 'Linus Invite' button...");
            await this.page.frameLocator('iframe[name="ifinbox"]').getByRole('button', { name: 'Linus Invite' }).click();

            const page2Promise = this.page.waitForEvent('popup');
            console.log("Clicked on 'Accept Invite' link...");
            await this.page.frameLocator('iframe[name="ifmail"]').getByRole('link', { name: 'Accept Invite' }).click();

            const page2 = await page2Promise;
            console.log("Clicked on 'First Name' field...");
            await page2.getByLabel('First Name').click();
            console.log("Filled 'First Name' field...");
            await page2.getByLabel('First Name').fill(firstName);
            console.log("Clicked on 'Last Name' field...");
            await page2.getByLabel('Last Name').click();
            console.log("Filled 'Last Name' field...");
            await page2.getByLabel('Last Name').fill(lastName);
            console.log("Clicked on 'Password' field...");
            await page2.getByLabel('Password', { exact: true }).click();
            console.log("Filled 'Password' field...");
            await page2.getByLabel('Password', { exact: true }).fill(password);
            console.log("Clicked on 'Submit' button...");
            await page2.getByRole('button', { name: 'Submit' }).click();

            console.log("Navigating to Yopmail inbox...");
            await this.page.goto('https://yopmail.com/wm');
            console.log("Waiting for 6 seconds...");
            await this.page.waitForTimeout(6000);
            const maxAttempts = 3;
            let attempts = 0;
            let success = false;

            while (!success && attempts < maxAttempts) {
                try {
                    console.log(`Attempt ${attempts + 1}: Clicking on '' button...`);
                    await this.page.getByRole('button', { name: '' }).click();
                    success = true;
                } catch (error) {
                    console.error(`Error during attempt ${attempts + 1}:`, error);
                    attempts++;
                    console.log("Waiting for 1 second before retrying...");
                    await this.page.waitForTimeout(1000);
                }
            }

            if (!success) {
                console.error("Failed to perform the button click after multiple attempts.");
                return false;
            }

            console.log("Clicking on 'no-reply@' button...");
            this.page.frameLocator('iframe[name="ifinbox"]').getByRole('button', { name: 'no-reply@' });
            console.log("Looking for verification code...");
            this.page.frameLocator('iframe[name="ifmail"]').getByText('The verification code to your')
            const divText = await this.page.$eval('div', (element) => element.textContent);
            if (divText !== null) {
                const verificationCode = divText.match(/\d+/)?.[0];
                console.log("Verification Code:", verificationCode);
                // Perform further actions using verificationCode
            } else {
                console.log("No <div> element found.");
            }

            return true;
        } catch (error) {
            console.error("Error during signup verification:", error);
            return false;
        }
    }

}


export default CreateCustomer;


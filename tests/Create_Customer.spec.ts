import { test, expect } from '@playwright/test';
import CreateCustomer from '../Pages/CreateCustomer';
import testData from '../testData';
import { RandomNumberGenerator } from '../Utilities/RandomNameGenerator';

test.describe('Customers All functionality', () => {
    test('Create Customer', async ({ page }) => {
        var { customerName, customerAddress,customerAddress2, customerCountry, customerState, customerCity,customerZipCode, customerPhoneNumber } = testData.customerData;
        const randomNumber: number = RandomNumberGenerator.generateRandomInteger(1, 100);

        customerName = customerName + "-" + randomNumber
        const customer = new CreateCustomer(page);
        await customer.customerNavigation();
        await customer.verificationGranted();
        await customer.clickAddCustomer();
        await page.waitForTimeout(3000);
        await customer.enterCustomerDetails(customerName, customerAddress, customerAddress2, customerCountry, customerState, customerCity, customerZipCode, customerPhoneNumber);
        const createdCustomerName = await customer.getCustomerName();
        // expect(createdCustomerName).toBe(customerName); // Assuming getCustomerName returns the created customer's name
        await customer.clickOnSaveBtn();
        await customer.userCreated();
        await page.waitForTimeout(5000);
    });
});

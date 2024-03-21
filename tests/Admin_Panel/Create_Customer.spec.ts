import { test } from '@playwright/test';
import CreateCustomer from '../../Pages/CreateCustomer';
import testData from '../../testData';
import { RandomNumberGenerator } from '../../Utilities/RandomNameGenerator';


const { customerName, customerAddress, customerAddress2, customerCountry, customerState, customerCity, customerZipCode, customerPhoneNumber } = testData.customerData;
const randomNumber: number = RandomNumberGenerator.generateRandomInteger(10, 1000);
const customerNameValue = customerName + "-" + randomNumber;
(globalThis as any).customerNameValue = customerNameValue;

export default function createCustomerTests() {

  test('Create Customer', async ({ page }) => {

      const customer = new CreateCustomer(page);
      await customer.customerNavigation();
      await customer.clickAddCustomer();
      await customer.enterCustomerDetails(customerNameValue, customerAddress, customerAddress2, customerCountry, customerState, customerCity, customerZipCode, customerPhoneNumber);
      await customer.clickOnSaveBtn();
      await page.waitForTimeout(5000);
      await customer.checkCustomer(page, customerNameValue);

    });
}
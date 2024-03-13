import { test } from '@playwright/test';
import testData from '../testData';
import CreateFacility from '../Pages/CreateFacility';

test.describe('Facility All functionality', () => {

  test('Create Facility', async ({ page }) => {
    const { facilityName, contactName } = testData.facilityData; // facilityStreet1, facilityStreet2, facilityCity, facilityCountry, facilityState, facilityZipCode, facilityWeight

    const facility = new CreateFacility(page);


    await facility.facilityNavigation();
    await facility.verificationgranted();
    await facility.clickAddFacility();
    await page.waitForTimeout(12000);
    const customerNameValue: string = (globalThis as any).customerNameValue;
    await facility.clickFacilityCustomer(customerNameValue, page);
    await facility.enterFacilityDetails(facilityName, contactName); //, facilityStreet1, facilityStreet2, facilityZipCode
    await facility.clickonFacilitySavebtn();
    await facility.verificationgranted();
  });

});
import { test, expect } from '@playwright/test';
import testData from '../testData';
import CreateFacility from '../Pages/CreateFacility';
import CreateCustomer from '../Pages/CreateCustomer';

test.describe('Facility All functionality', () => {

test('Create Facility', async ({ page }) => {
  const {  facilityName,contactName } = testData.facilityData; // facilityStreet1, facilityStreet2, facilityCity, facilityCountry, facilityState, facilityZipCode, facilityWeight

  console.log(testData.facilityData);

  const facility = new CreateFacility(page);
  const customer = new CreateCustomer(page);

  await facility.facilityNavigation();
  await facility.verificationgranted();
  await facility.clickAddFacility();
  await page.waitForTimeout(12000);
  await facility.clickFacilityCustomer();
  await customer.getCustomerName();
  await facility.enterFacilityDetails(facilityName,contactName); //, facilityStreet1, facilityStreet2, facilityZipCode
  // await facility.selectFacilityCountry();
  // await facility.selecteFacilitystate();
  // await facility.selectFacilityCity();
  // await facility.selectFacilityweight();
  await facility.clickonFacilitySavebtn();
  // await page.pause(); // Note: You may want to remove this pause or replace it with a meaningful action
  await facility.verificationgranted();
});

});
import { test } from '@playwright/test';
import testData from '../testData';
import CreateFacility from '../Pages/CreateFacility';

test.skip('Create Facility', async ({ page }) => {
  const { facilityCustomerName, facilityName, facilityStreet1, facilityStreet2, facilityCity, facilityCountry, facilityState, facilityZipCode, facilityWeight } = testData.facilityData;

  console.log(testData.facilityData);

  const facility = new CreateFacility(page);
  await facility.facilityNavigation();
  await facility.verificationgranted();
  await facility.clickAddFacility();
  await page.waitForTimeout(12000);
  await facility.clickFacilityCustomer();
  await facility.enterFacilityDetails(facilityName, facilityStreet1, facilityStreet2, facilityZipCode);
  await facility.selectFacilityCountry();
  await facility.selecteFacilitystate();
  await facility.selectFacilityCity();
  await facility.selectFacilityweight();
  await facility.clickonFacilitySavebtn();
  await page.pause(); // Note: You may want to remove this pause or replace it with a meaningful action
  await facility.verificationgranted();
});

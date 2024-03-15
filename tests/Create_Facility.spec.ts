import { test } from '@playwright/test';
import testData from '../testData';
import CreateFacility from '../Pages/CreateFacility';

const { facilityName, contactName } = testData.facilityData;
const customerNameValue: string = (globalThis as any).customerNameValue;
const facilityNameValue = customerNameValue + "-" + facilityName;
(globalThis as any).facilityNameValue = facilityNameValue;

export default function createFacilityTests() {
  test.describe('Facility All functionality', () => {
    test('Create Facility', async ({ page }) => {
      const facility = new CreateFacility(page);
      await facility.facilityNavigation();
      await facility.clickAddFacility();
      await facility.clickFacilityCustomer(customerNameValue, page);
      await facility.enterFacilityDetails(facilityNameValue, contactName);
      await facility.clickonFacilitySavebtn();
      await facility.facilityNavigation();
      
    });
  });
}
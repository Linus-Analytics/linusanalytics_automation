import { test } from '@playwright/test';
import testData from '../testData';
import CreateBin from '../Pages/Createbin';



const { binName,maxCapacity } = testData.binData;
const customerNameValue: string = (globalThis as any).customerNameValue;
const facilityNameValue: string = (globalThis as any).facilityNameValue;
const binNameValue = binName + '-' + customerNameValue;

export default function createBinTests() {

test.describe('Bin All functionality', () => {

  test('Create Bin', async ({ page }) => {

    const bin = new CreateBin(page);
    await bin.binNavigation();
    await bin.clickAddBin();
    await bin.enterBinDetails(binNameValue, maxCapacity);
    await bin.clickBinCustomer(customerNameValue, page);
    await bin.clickBinFacility(facilityNameValue, page);
    await bin.clickonbinSavebtn();
  });

});
}
import { test } from '@playwright/test';
import testData from '../testData';
import CreateScale from '../Pages/CreateScale';



const { scaleId, scaleName } = testData.scaleData;
const customerNameValue: string = (globalThis as any).customerNameValue;
const facilityNameValue: string = (globalThis as any).facilityNameValue;
const scaleNameValue = scaleName + '-' + customerNameValue;

export default function createScaleTests() {

test.describe('Scale All functionality', () => {

  test('Create Scale', async ({ page }) => {

    const Scale = new CreateScale(page);
    await Scale.scaleNavigation();
    await Scale.clickAddScale();
    await Scale.enterScaleDetails(scaleId, scaleNameValue);
    await Scale.clickScaleCustomer(customerNameValue, page);
    await Scale.clickScaleFacility(facilityNameValue, page);
    await Scale.clickonScaleSavebtn();
  });

});

}




















// test.skip('Create Scale', async ({ page }) => {
//   const { scaleId, scaleName } = testData.scaleData;

//   console.log(testData.scaleData);

//   const scale = new CreateScale(page as Page);
//   await scale.scaleNavigation();
//   await scale.verificationGranted();
//   await scale.clickAddScale();
//   await page.waitForTimeout(12000);
//   await scale.ScaleCreate(scaleId, scaleName);
//   await scale.clickOnScaleSavebtn();
//   await scale.verificationGranted();
// });

// test('Archive Scale', async ({ page }) => {
//   const { scaleId, scaleName } = testData.scaleData;
//   const scale = new CreateScale(page as Page);
//   await scale.scaleNavigation();
//   await page.waitForTimeout(3000);
//   await scale.searchScale(scaleId);
//   await page.waitForTimeout(3000);
//   await scale.goToSearchedScale(scaleId);
//   await page.waitForTimeout(3000);
//   await scale.archiveScale();
//   await page.waitForTimeout(3000);
// });
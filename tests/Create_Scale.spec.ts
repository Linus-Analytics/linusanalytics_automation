import { test } from '@playwright/test';
import CreateScale from '../Pages/CreateScale';
import testData from '../testData';
import { Page } from 'playwright';


test.describe('Scale All functionality', () => {

  test('Create Scale', async ({ page }) => {
    const { scaleId, scaleName } = testData.scaleData;

    console.log(testData.scaleData);

    const scale = new CreateScale(page as Page);
    await scale.scaleNavigation();
    await scale.verificationGranted();
    await scale.clickAddScale();
    await page.waitForTimeout(12000);
    await scale.ScaleCreate(scaleId, scaleName);
    await scale.clickOnScaleSavebtn();
    await scale.verificationGranted();
  });

  test('Archive Scale', async ({ page }) => {
    const { scaleId, scaleName } = testData.scaleData;
    const scale = new CreateScale(page as Page);
    await scale.scaleNavigation();
    await page.waitForTimeout(3000);
    await scale.searchScale(scaleId);
    await page.waitForTimeout(3000);
    await scale.goToSearchedScale(scaleId);
    await page.waitForTimeout(3000);
    await scale.archiveScale();
    await page.waitForTimeout(3000);
  });
});

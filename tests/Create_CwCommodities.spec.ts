import { test } from '@playwright/test';
import testData from '../testData';
import CreateCommodity from '../Pages/CreateCommodity';



const { commodityName } = testData.commodityData;
const customerNameValue: string = (globalThis as any).customerNameValue;
const commodityNameValue = commodityName + '-' + customerNameValue;


test.describe('Commodity All functionality', () => {

  test('Create Commodity', async ({ page }) => {

    const commodity = new CreateCommodity(page);
    await commodity.commodityNavigation();
    await commodity.clickAddcommodity();
    await commodity.enterCommodityDetails(commodityNameValue);
    await commodity.clickonCommoditySavebtn();
    await commodity.commodityNavigation();
  });

});
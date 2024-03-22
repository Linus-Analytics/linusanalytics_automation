import { test } from '@playwright/test';
import testData from '../testData';
import CreateScale_Cl from '../Pages/Customer_Panel/Create_Scale_CL';



const { scaleName, scaleId } = testData.scaleDataCL;
const customerNameValue: string = (globalThis as any).customerNameValue;
const facilityNameValue: string = (globalThis as any).facilityNameValue;
const scaleNameValue: string = (globalThis as any).scaleNameValue;

export default function checkScaleTests() {

test.describe('Check Scale', () => {

  test('Create Scale', async ({ page }) => {

    const scale = new CreateScale_Cl(page);
    await scale.clearCache();
    await scale.login();
    await scale.scaleNavigation();
    await scale.searchscale(scaleNameValue);
    await scale.update(scaleName,scaleId);
    await scale.clickonscaleSavebtn();
    await scale.scaleNavigation();
    await scale.verifyscale(scaleName);

 
  });

});
}



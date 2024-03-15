import { test } from '@playwright/test';
import testData from '../testData';
import CreateMachineType from '../Pages/CreateMachineType';



const { machinetypeName } = testData.machinetypeData;
const customerNameValue: string = (globalThis as any).customerNameValue;
const machinetype = machinetypeName + '-' + customerNameValue;
(globalThis as any).machinetypeName = machinetypeName;

export default function createMachineTypeTests() {

test.describe('Machine Type All functionality', () => {

  test('Create Commodity', async ({ page }) => {

    const commodity = new CreateMachineType(page);
    await commodity.MachineTypeNavigation();
    await commodity.clickAddMachineType();
    await commodity.enterMachineTypeDetails(machinetype);
    await commodity.clickonMachineTypeSavebtn();
    await commodity.MachineTypeNavigation();
  });

});
}
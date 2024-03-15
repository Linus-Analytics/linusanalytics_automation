import { test } from '@playwright/test';
import testData from '../testData';
import CreateMachineType from '../Pages/CreateMachineType';



const { machinetypeName } = testData.machinetypeData;
const customerNameValue: string = (globalThis as any).customerNameValue;
const machinetype = machinetypeName + '-' + customerNameValue;
(globalThis as any).machinetypeName = machinetypeName;

export default function addMachineTypeTests() {

test.describe('Machine Type All functionality', () => {

  test('Create Machine Type', async ({ page }) => {

    const machineType = new CreateMachineType(page);
    await machineType.MachineTypeNavigation();
    await machineType.clickAddMachineType();
    await machineType.enterMachineTypeDetails(machinetype);
    await machineType.clickonMachineTypeSavebtn();
    await machineType.MachineTypeNavigation();
  });

});
}
// import { test } from '@playwright/test';
// import testData from '../../testData';
// import CreateMachine from '../../Pages/CreateMachine';



// const { MachineName } = testData.machineData;
// const customerNameValue: string = (globalThis as any).customerNameValue;
// const facilityNameValue: string = (globalThis as any).facilityNameValue;
// const MachineTypeNameValue: string = (globalThis as any).MachineTypeNameValue;
// const machineNameValue = MachineName + '-' + customerNameValue;

// export default function createMachineTests() {

//   test('Create Machine', async ({ page }) => {

//     const machine = new CreateMachine(page);
//     await machine.MachineNavigation();
//     await machine.clickAddMachine();
//     await machine.enterMachineDetails(machineNameValue);
//     await machine.clickMachineCustomer(customerNameValue, page);

//     await machine.clickMachineFacility(facilityNameValue, page);
//     await machine.clickMachineMachineType(MachineTypeNameValue, page);
//     await machine.clickonMachineSavebtn();
//   });

// }
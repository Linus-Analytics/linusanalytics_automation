import { test } from '@playwright/test';
import globalSetup from '../global-setup';
import addMachineTypeTests from './Admin_Panel/Create_MachineType.spec';
import createBinTests from './Admin_Panel/Create_Bin.spec';
import createCommodityTests from './Admin_Panel/Create_Commodities.spec';
import createCustomerTests from './Admin_Panel/Create_Customer.spec';
import createFacilityTests from './Admin_Panel/Create_Facility.spec';
import createMachineTests from './Admin_Panel/Create_Machine.spec';
import createScaleTests from './Admin_Panel/Create_Scale.spec';
import { beforeEach } from 'node:test';

// beforeEach(async () => {
//     // Call your setup function here
//     await globalSetup('linusqa@yopmail.com', 'P@ss1234');
// });

test.describe('Admin Panel Test', () => {
    // Run your admin panel test steps here

    test.describe('Customer Tests', () => {
        createCustomerTests();
    });

    test.describe('Commodity Tests', () => {
        createCommodityTests();
    });

    test.describe('Machine Type Tests', () => {
        addMachineTypeTests();
    });

    test.describe('Facility Tests', () => {
        createFacilityTests();
    });

    test.describe('Bin Tests', () => {
        createBinTests();
    });

    test.describe('Machine Tests', () => {
        createMachineTests();
    });

    test.describe('Scale Tests', () => {
        createScaleTests();
    });
});

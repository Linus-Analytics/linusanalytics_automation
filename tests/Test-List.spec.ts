import { test } from '@playwright/test';
import createCustomerTests from './Create_Customer.spec';
import createFacilityTests from './Create_Facility.spec';
import createMachineTests from './Create_Machine.spec';
import createBinTests from './Create_Bin.spec';
import createScaleTests from './Create_Scale.spec';
import createMachineTypeTests from './Create_Machine.spec';




test.describe('Customer Tests', () => {
    createCustomerTests();

});

test.describe('Commoditiy Tests', () => {
    createFacilityTests();

});


test.describe('Machine Type Tests', () => {
    createMachineTypeTests();

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







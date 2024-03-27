import { test, chromium, Page } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import testData from '../testData';
import axios from 'axios';
import CreateScale from '../Pages/Customer_Panel/Customer_CreateScales';
import CreateBin from '../Pages/Customer_Panel/Customer_CreateBins';
import CreateMachine from '../Pages/Customer_Panel/Customer_CreateMachines';
import CreateHopper from '../Pages/Customer_Panel/Customer_CreateHoppers';

test.describe('Customer Panel', async () => {
    let browser
    let context;
    let page: Page;
    // let customer: CreateCustomer;
    let login: LoginPage;
    // let facility: CreateFacility;
    let scale: CreateScale;
    let bin: CreateBin;
    let machine: CreateMachine;
    let hopper: CreateHopper;

    test.beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        login = new LoginPage(page);
        // customer = new CreateCustomer(page);
        // facility = new CreateFacility(page);
        scale = new CreateScale(page);
        bin = new CreateBin(page);
        machine = new CreateMachine(page);
        hopper = new CreateHopper(page);

        const username = "auto-952@yopmail.com";
        const password = "P@ss1234";
        const url = "https://staging-app.linusanalytics.com";
        const maxRetries = 3;
        let retries = 0;

        while (retries < maxRetries) {
            const response = await axios.get(`${url}/api/auth/session`);
            if (response.status === 200) {
                break; // Break out of the loop if API request succeeds
            }
            retries++;
            console.error(`API request failed, retrying (${retries}/${maxRetries})...`);
            if (retries === maxRetries) {
                throw new Error('Maximum retries reached, cannot proceed with login');
            }
        }
        await login.login(url, username, password);
    });

    test('Verify scale created by admin reflected on customer dashboard', async () => {

        const scaleNameValue: string = (globalThis as any).scaleNameValue;
        await scale.scale_navigation();
        await scale.verifyScaleName("Auto-952-Scale");


    });

    test('Verify bin created by admin reflected on customer dashboard', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const facilityNameValue: string = (globalThis as any).facilityNameValue;
        const { binName, maxCapacity, capacityThreshold } = testData.binData;
        const binNameValue = customerNameValue + "-" + binName;
        (globalThis as any).binNameValue = binNameValue;

        await bin.bin_navigation();
        await bin.verifyBinName("Auto-952-Bin");

    });

    test.skip('Verify machine created by admin reflected on customer dashboard', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const facilityNameValue: string = (globalThis as any).facilityNameValue;
        const MachineName = testData.machineData;
        const machineNameValue = customerNameValue + "-" + MachineName;
        (globalThis as any).machineNameValue = machineNameValue;

        await machine.machine_navigation();
        await machine.verifymachine(machineNameValue);

    });

    test('Verify hopper created by admin reflected on customer dashboard', async () => {
        const hopperNameValue: string = (globalThis as any).hopperNameValue;

        await hopper.hopper_navigation();
        await hopper.verifyHopperName("Auto-952-Hopper");

    });

    // test.afterAll(async () => {
    //     await browser.close();
    // });
});
import { test, chromium, Page, Browser } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import testData from '../testData';
import axios from 'axios';

import VerifyBin from '../Pages/Customer_Panel/Customer_VerifyBins';
import VerifyMachine from '../Pages/Customer_Panel/Customer_VerifyMachines';
import VerifyHopper from '../Pages/Customer_Panel/Customer_VerifyHoppers';
import VerifyScale from '../Pages/Customer_Panel/Customer_VerifyScales';

test.describe('Customer Panel --> Verification Tests', async () => {
    let browser: Browser
    let context;
    let page: Page;
    let login: LoginPage;
    let scale: VerifyScale;
    let bin: VerifyBin;
    let machine: VerifyMachine;
    let hopper: VerifyHopper;

    test.beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        login = new LoginPage(page);
        scale = new VerifyScale(page);
        bin = new VerifyBin(page);
        machine = new VerifyMachine(page);
        hopper = new VerifyHopper(page);

        const username = "demouser@yopmail.com";
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
        await scale.verifyScaleName(scaleNameValue);


    });

    test('Verify bin created by admin reflected on customer dashboard', async () => {


        const binNameValue: string = (globalThis as any).binNameValue;
        const { newCapacity, capacityThreshold } = testData.binData;

        await bin.bin_navigation();
        await bin.verifyBinName(binNameValue);

    });

    test('Verify machine created by admin reflected on customer dashboard', async () => {

        const machineNameValue: string = (globalThis as any).machineNameValue;
        await machine.machine_navigation();
        await machine.verifyMachineName(machineNameValue);

    });

    test('Verify hopper created by admin reflected on customer dashboard', async () => {
        const hopperNameValue: string = (globalThis as any).hopperNameValue;

        await hopper.hopper_navigation();
        await hopper.verifyHopperName(hopperNameValue);

    });

    test.afterAll(async () => {
        await browser.close();
    });
});
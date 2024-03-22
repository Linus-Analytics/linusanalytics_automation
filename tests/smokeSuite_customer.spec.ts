import { test, chromium, Page } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import testData from '../testData';
import { RandomNumberGenerator } from '../Utilities/RandomNameGenerator';
import axios from 'axios';
import CreateScale_Cl from '../Pages/Customer_Panel/Create_Scale_CL';
import CreateScale from '../Pages/Admin_Panel/CreateScale';

test.describe('Customer Panel', async () => {
    let browser
    let context;
    let page: Page;
    // let customer: CreateCustomer;
    let login: LoginPage;
    // let facility: CreateFacility;
    let scale: CreateScale_Cl;

    test.beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        login = new LoginPage(page);
        // customer = new CreateCustomer(page);
        // facility = new CreateFacility(page);
        scale = new CreateScale_Cl(page);


        const username = "dell@yopmail.com";
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

    // test('Create Customer', async () => {

    // });

    // test('Create Facility', async () => {

    // });

    test('Create Scale', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const facilityNameValue: string = (globalThis as any).facilityNameValue;
        const {scaleId,scaleName} = testData.scaleData;
        const scaleNameValue = customerNameValue + "-" + scaleName;
        (globalThis as any).scaleNameValue = scaleNameValue;


        await scale.scaleNavigation();
        await scale.verifyscale(page,'Scale Name');

    });

    // test.afterAll(async () => {
    //     await browser.close();
    // });
});
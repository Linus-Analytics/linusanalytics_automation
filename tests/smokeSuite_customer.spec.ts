import { test, chromium } from '@playwright/test';
import CreateCustomer from '../Pages/CreateCustomer';
import LoginPage from '../Pages/LoginPage';
import testData from '../testData';
import { RandomNumberGenerator } from '../Utilities/RandomNameGenerator';
import axios from 'axios';
import CreateFacility from '../Pages/CreateFacility';

test.describe('Customer Panel', async () => {
    let browser
    let context;
    let page;
    let customer: CreateCustomer;
    let login: LoginPage;
    let facility: CreateFacility;

    test.beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        login = new LoginPage(page);
        customer = new CreateCustomer(page);
        facility = new CreateFacility(page);


        const username = "linusqa@yopmail.com";
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

    test('Create Customer', async () => {

    });

    test('Create Facility', async () => {



    });

    // test.afterAll(async () => {
    //     await browser.close();
    // });
});
import { test, chromium } from '@playwright/test';
import CreateCustomer from '../Pages/Admin_Panel/CreateCustomer';
import LoginPage from '../Pages/LoginPage';
import testData from '../testData';
import { RandomNumberGenerator } from '../Utilities/RandomNameGenerator';
import axios from 'axios';
import CreateFacility from '../Pages/Admin_Panel/CreateFacility';
import CreateScale from '../Pages/Admin_Panel/CreateScale';

test.describe('Test with Admin Credentials', async () => {
    let browser
    let context;
    let page;
    let customer: CreateCustomer;
    let login: LoginPage;
    let facility: CreateFacility;
    let scale: CreateScale;

    test.beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        login = new LoginPage(page);
        customer = new CreateCustomer(page);
        facility = new CreateFacility(page);
        scale = new CreateScale(page);


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
        const { customerName, streetAddress1, streetAddress2, countryName, state, city, zipCode, phoneNumber } = testData.customerData;
        const randomNumber: number = RandomNumberGenerator.generateRandomInteger(10, 1000);
        const customerNameValue = customerName + "-" + randomNumber;
        (globalThis as any).customerNameValue = customerNameValue;


        await customer.addCustomer(customerNameValue, streetAddress1, streetAddress2, countryName, state, city, zipCode, phoneNumber);
        await customer.checkCustomer(customerNameValue);
    });


    test('Create Facility', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const {facilityName,contactName } = testData.facilityData;
        const facilityNameValue = customerNameValue + "-" + facilityName;
        (globalThis as any).facilityNameValue = facilityNameValue;


        await facility.facilityNavigation();
        await facility.addFacility(customerNameValue,facilityNameValue,contactName);

        await facility.checkfacility(facilityNameValue);
        // await facility.enterFacilityDetails(facilityNameValue, contactName);
        // await facility.clickonFacilitySavebtn();
        // await facility.verifyFacilityCreated(page, facilityNameValue);

    });

    test('Create Scale', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const facilityNameValue: string = (globalThis as any).facilityNameValue;
        const {scaleId,scaleName} = testData.scaleData;
        const scaleNameValue = customerNameValue + "-" + scaleName;
        (globalThis as any).scaleNameValue = scaleNameValue;


        await scale.scaleNavigation();
        await scale.addScale(customerNameValue,facilityNameValue,scaleId,scaleNameValue);
        await scale.checkscale(scaleNameValue);
        
    });

    // test.afterAll(async () => {
    //     await browser.close();
    // });
});
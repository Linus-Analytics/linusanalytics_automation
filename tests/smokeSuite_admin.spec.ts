import { test, chromium } from '@playwright/test';
import CreateCustomer from '../Pages/Admin_Panel/CreateCustomer';
import LoginPage from '../Pages/LoginPage';
import testData from '../testData';
import { RandomNumberGenerator } from '../Utilities/RandomNameGenerator';
import axios from 'axios';
import CreateFacility from '../Pages/Admin_Panel/CreateFacility';
import CreateScale from '../Pages/Admin_Panel/CreateScale';
import CreateBin from '../Pages/Admin_Panel/Createbin';
import CreateMachineType from '../Pages/Admin_Panel/CreateMachineType';
import CreateCommodity from '../Pages/Admin_Panel/CreateCommodity';
import { machine } from 'os';
import CreateMachine from '../Pages/Admin_Panel/Createmachine';
import CreateHopper from '../Pages/Admin_Panel/CreateHopper';

test.describe('Test with Admin Credentials', async () => {
    let browser
    let context;
    let page: any;
    let customer: CreateCustomer;
    let login: LoginPage;
    let facility: CreateFacility;
    let scale: CreateScale;
    let bin: CreateBin;
    let machinetype: CreateMachineType;
    let commodity: CreateCommodity;
    let machine: CreateMachine;
    let hopper: CreateHopper;


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
        bin = new CreateBin(page);
        machinetype = new CreateMachineType(page);
        commodity = new CreateCommodity(page);
        machine = new CreateMachine(page);
        hopper = new CreateHopper(page);


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


    // test('Add User', async () => {
    //     const customerNameValue = (globalThis as any).customerNameValue;
    //     const email = customerNameValue + '@yopmail.com';
    //     const role = 'Admin';
    //     const firstName = "AutoFirst";
    //     const lastName = "AutoLast";
    //     const password = "P@ss1234";

    //     await customer.clickOnCustomerDetail(customerNameValue)
    //     await customer.addUser(customerNameValue, email, role);

    // });

    // test('Verify User Email', async () => {
    //     const customerNameValue = (globalThis as any).customerNameValue;
    //     const email = customerNameValue + '@yopmail.com';
    //     const role = 'Admin';
    //     const firstName = "AutoFirst";
    //     const lastName = "AutoLast";
    //     const password = "P@ss1234";

    //     await customer.verifySignupEmail(customerNameValue, firstName, lastName, password)

    // });

    test('Create Facility', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const { facilityName, contactName } = testData.facilityData;
        const facilityNameValue = customerNameValue + "-" + facilityName;
        (globalThis as any).facilityNameValue = facilityNameValue;


        await facility.facilityNavigation();
        await facility.addFacility(customerNameValue, facilityNameValue, contactName);

        await facility.checkfacility(facilityNameValue);


    });

    test('Create Scale', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const facilityNameValue: string = (globalThis as any).facilityNameValue;
        const { scaleId, scaleName } = testData.scaleData;
        const scaleNameValue = customerNameValue + "-" + scaleName;
        (globalThis as any).scaleNameValue = scaleNameValue;


        await scale.scaleNavigation();
        await scale.addScale(customerNameValue, facilityNameValue, scaleId, scaleNameValue);
        await scale.checkscale(scaleNameValue);

    });


    test('Create Bin', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const facilityNameValue: string = (globalThis as any).facilityNameValue;
        const {binName,maxCapacity,capacityThreshold} = testData.binData;
        const binNameValue = customerNameValue + "-" + binName;
        (globalThis as any).binNameValue = binNameValue;
        


        await bin.binNavigation();
        await bin.addBin(customerNameValue,facilityNameValue,binNameValue,maxCapacity);
        await bin.checkbin(binNameValue);
        
    });

    test('Create Machine Type', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const {machinetypeName} = testData.machinetypeData;
        const machinetypeNameValue = customerNameValue + "-" + machinetypeName;
        (globalThis as any).machinetypeNameValue = machinetypeNameValue;
        


        await machinetype.machinetypeNavigation();
        await machinetype.addMachineType(machinetypeNameValue);
        await machinetype.checkmachinetype(machinetypeNameValue);
        
    });

    test('Create Machine', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const facilityNameValue: string = (globalThis as any).facilityNameValue;
        const machinetypeNameValue: string = (globalThis as any).machinetypeNameValue;
        const {machineName} = testData.machineData;
        const machineNameValue = customerNameValue + "-" + machineName;
        (globalThis as any).machineNameValue = machineNameValue;
        


        await machine.machineNavigation();
        await machine.addMachine(customerNameValue,facilityNameValue,machineNameValue,machinetypeNameValue);
        await machine.checkmachine(machineNameValue);
        
    });

    test('Create Commodity', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const {commodityName} = testData.commodityData;
        const commodityNameValue = customerNameValue + "-" + commodityName;
        (globalThis as any).commodityNameValue = commodityNameValue;


        await commodity.commodityNavigation();
        await commodity.addcommodity(commodityNameValue);
        await commodity.checkcommodity(commodityNameValue);
        
    });

    test('Create Hopper', async () => {

        const customerNameValue: string = (globalThis as any).customerNameValue;
        const facilityNameValue: string = (globalThis as any).facilityNameValue;
        const binNameValue: string = (globalThis as any).binNameValue;
        const machineNameValue: string = (globalThis as any).machineNameValue;
        const commodityNameValue: string = (globalThis as any).commodityNameValue;
        const {HopperName} = testData.hopperData;
        const hopperNameValue = customerNameValue + "-" + HopperName;


        await hopper.hopperNavigation();
        await hopper.addHopper(customerNameValue,facilityNameValue,hopperNameValue,binNameValue,commodityNameValue,machineNameValue);
        await hopper.checkhopper(hopperNameValue);
        
    });




    // test.afterAll(async () => {
    //     await browser.close();
    // });
});
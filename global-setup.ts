import { chromium, expect } from '@playwright/test';
import fs from 'fs/promises';
import config from './playwright.config';
import axios from 'axios'; // Import axios for making HTTP requests

async function saveStorageStateToJson(storageState: any, path: string) {
    try {
        await fs.writeFile(path, JSON.stringify(storageState));
        console.log('Storage state saved to', path);
    } catch (error) {
        console.error('Error saving storage state:', error);
    }
}

async function globalSetup() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const baseURL = (config.use as { baseURL?: string }).baseURL;
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            // Make an HTTP request to check API status
            const response = await axios.get(`${baseURL}/api/auth/session`);
            if (response.status !== 200) {
                throw new Error(`API returned status ${response.status}`);
            }
            break; // Break out of the loop if API request succeeds
        } catch (error) {
            retries++;
            console.error(`API request failed, retrying (${retries}/${maxRetries})...`);
            if (retries === maxRetries) {
                throw new Error('Maximum retries reached, cannot proceed with login');
            }
        }
    }

    await page.goto(`${baseURL}/login`, { timeout: 60000 });

    await page.locator("//input[@name='username']").fill('linusqa@yopmail.com');
    await page.locator("//input[@name='password']").fill('P@ss1234');

    console.log("User Name_______: linusqa@yopmail.com ");
    console.log("Password_______: P@ss1234 ");

    await page.click("//button[contains(text(),'Login')]");

    await expect(page.locator('//a[@href="/dashboard"]')).toBeVisible({ timeout: 60000 });

    console.log("User Successfully Logged into the Linus App");

    const storageState = await context.storageState();
    await saveStorageStateToJson(storageState, './loginAuth.json');

    // Save the state of the web page
    await page.context().storageState({ path: "./loginAuth.json" });

    // Close browser
    await browser.close();
}

export default globalSetup;

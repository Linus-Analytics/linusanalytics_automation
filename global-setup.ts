import { chromium, BrowserContext, Page, expect } from '@playwright/test';
import fs from 'fs/promises';

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

    await page.goto('https://staging-app.linusanalytics.com/login');

    await page.locator("//input[@name='username']").fill('linusqa@yopmail.com');
    await page.locator("//input[@name='password']").fill('P@ss1234');

    console.log("User Name_______: linusqa@yopmail.com ")
    console.log("Password_______: P@ss1234 ")

    await page.click("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth mui-8mnh6o']");

    await expect(page.locator('//div/p[contains(text(),"Commodities")]')).toBeVisible({ timeout: 60000 });

    console.log("User Successfully Logged Into the Linus App")

    const storageState = await context.storageState();
    await saveStorageStateToJson(storageState, './loginAuth.json');

    // Save the state of the web page
    await page.context().storageState({ path: "./loginAuth.json" });

    await browser.close();
}

export default globalSetup;

import { Locator, Page, expect } from '@playwright/test';
import fs from 'fs/promises';

async function saveStorageStateToJson(storageState: any, path: string) {
    try {
        await fs.writeFile(path, JSON.stringify(storageState));
        // console.log('Storage state saved to', path);
    } catch (error) {
        console.error('Error saving storage state:', error);
    }
}

class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(URL: string, username: string, password: string): Promise<void> {
        await this.page.goto(URL);
        await this.page.getByLabel('Email address').click();
        await this.page.getByLabel('Email address').fill(username);
        await this.page.getByLabel('Password', { exact: true }).click();
        await this.page.getByLabel('Password', { exact: true }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
        console.log("User Successfully Logged into the Linus App");

        let expectedURL = "https://staging-app.linusanalytics.com/admin/dashboard"
        this.verifyNavigation(expectedURL)

        const storageState = await this.page.context().storageState();
        await saveStorageStateToJson(storageState, './loginAuth.json');
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            currentURL === url; // Check if the current URL matches the expected URL
            console.log('Successfully navigated to url ::' + url); // Log the result
            return true; // Return the result
        } catch (error) {
            console.error('Error occurred while navigating:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

}

export default LoginPage;

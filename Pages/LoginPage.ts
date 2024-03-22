import { Locator, Page, expect } from '@playwright/test';
import fs from 'fs/promises';

async function saveStorageStateToJson(storageState: any, path: string) {
    try {
        await fs.writeFile(path, JSON.stringify(storageState));
        console.log('Storage state saved to', path);
    } catch (error) {
        console.error('Error saving storage state:', error);
    }
}

class LoginPage {
    private page: Page;

    private input_emailAddress: Locator;
    private input_Password: Locator;
    private btn_login: Locator;

    constructor(page: Page) {
        this.page = page;

        this.input_emailAddress = page.locator('input[name="username"]');
        this.input_Password = page.locator('input[name="password"]');
        this.btn_login = page.locator('button:has-text("Login")');
    }

    async login(URL: string, username: string, password: string): Promise<void> {
        await this.page.goto(URL);
        await this.input_emailAddress.click();
        await this.input_emailAddress.fill(username);
        await this.input_Password.fill(password);
        await this.btn_login.click();
        await this.page.waitForNavigation(); // Wait for navigation to complete

        console.log("User Successfully Logged into the Linus App");

        const storageState = await this.page.context().storageState();
        await saveStorageStateToJson(storageState, './loginAuth.json');
    }
}

export default LoginPage;

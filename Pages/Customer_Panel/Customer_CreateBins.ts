import { Page } from 'playwright';
import { expect } from 'playwright/test';

class CreateBin {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async verifybin(binName:string){
        await this.page.waitForNavigation({ timeout: 5000 });
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/dashboard?facilityId=395');

        
        await this.page.getByRole('button', { name: 'Manage-icon Manage' }).click();

        await this.page.getByRole('button', { name: 'Bins' }).click();
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/bins?facilityId=395');
        console.log('User navigated to the bin page');
        // console.log("Bin Name Check ========> " + binName)
        await this.page.getByRole('cell', { name: 'UK Bin' }).click();
        
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/bins/UK%20Bin?facilityId=395&id=330');
        console.log('User navigated to the bin details page');
        await this.page.waitForTimeout(5000);

    }

    async bin_navigation(){

        await this.page.getByRole('button', { name: 'Overview-icon Overview' }).click();
        console.log('User navigated to the dashboard');

    }


}export default CreateBin;

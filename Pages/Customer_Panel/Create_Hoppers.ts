import { Page } from 'playwright';
import { expect } from 'playwright/test';

class CreateHopper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async verifyhopper(hopperName:string){
        await this.page.waitForNavigation({ timeout: 5000 });
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/dashboard?facilityId=395');

        
        await this.page.getByRole('button', { name: 'Manage-icon Manage' }).click();

        await this.page.getByRole('button', { name: 'Hoppers' }).click();
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/hoppers?facilityId=395');
        console.log('User navigated to the hopper page');
        // console.log("Hopper Name Check ========> " + hopperName)
        await this.page.getByRole('cell', { name: 'UK Hopper' }).click();
        
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/hoppers/UK%20Hopper?facilityId=395&id=272');
        console.log('User navigated to the hopper details page');
        await this.page.waitForTimeout(5000);

    }

    async hopper_navigation(){

        await this.page.getByRole('button', { name: 'Overview-icon Overview' }).click();
        console.log('User navigated to the dashboard');

    }


}export default CreateHopper;

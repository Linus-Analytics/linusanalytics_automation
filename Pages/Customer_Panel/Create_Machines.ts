import { Page } from 'playwright';
import { expect } from 'playwright/test';

class CreateMachine {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async verifymachine(machineName:string){
        await this.page.waitForNavigation({ timeout: 5000 });
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/dashboard?facilityId=395');

        
        await this.page.getByRole('button', { name: 'Manage-icon Manage' }).click();

        await this.page.getByRole('button', { name: 'Machines' }).click();
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/machines?facilityId=395');
        console.log('User navigated to the machine page');
        // console.log("Machine Name Check ========> " + machineName)
        await this.page.getByRole('cell', { name: 'UK Machine' }).click();
        
        await expect(this.page).toHaveURL('https://staging-app.linusanalytics.com/machines/UK%20Machine?facilityId=395&id=330');
        console.log('User navigated to the machine details page');
        await this.page.waitForTimeout(5000);

    }

    async machine_navigation(){

        await this.page.getByRole('button', { name: 'Overview-icon Overview' }).click();
        console.log('User navigated to the dashboard');

    }


}export default CreateMachine;

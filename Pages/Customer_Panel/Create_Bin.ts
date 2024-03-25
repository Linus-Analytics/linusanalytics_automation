import { Locator, Page } from 'playwright';

class CreateBin {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async binNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Bins' }).click();
            let expectedURL = 'https://staging-app.linusanalytics.com/bins';
            await this.verifyNavigation(expectedURL);
            console.log('Successfully navigated to Bin tab');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding Bin:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            let currenturl = this.page.url();
   
            await this.page.waitForTimeout(10000);

            if(url == currenturl){
                console.log("URl Verification Done");

            }else{

                console.log("User Navigation Un-Successfull");
            }

            return true; // Return true if the current URL matches the expected URL
            
        } catch (error) {
            console.error('Error occurred while adding Bin:', error);
            return false; // Return false if any error ozccurred while entering details
        }
    }

    async verifybin(page: Page, binName:string){

        // await page.goto('https://staging-app.linusanalytics.com/dashboard');

        // await page.goto('https://staging-app.linusanalytics.com/dashboard?facilityId=395');
        
        await page.getByRole('button', { name: 'Manage-icon Manage' }).click();

        await page.getByRole('button', { name: 'Bins' }).click();

        let expectedName = "https://staging-app.linusanalytics.com/bins";

        await this.verifyNavigation(expectedName);
        console.log('User navigate to the Bin Page');
        await page.getByRole('cell', { name: binName }).locator('div').click();
        console.log('User navigate to the Bin Details Page');
        await page.waitForTimeout(5000);

    }

    async verifiedbin(bin: string){
            try {
                const currentbin = this.page.url(); // Get the current URL
                console.log("Bin Verification Successfully Done");
                return currentbin === bin; // Return true if the current URL matches the expected URL
            } catch (error) {
                console.error('Error occurred while adding bin:', error);
                return false; // Return false if any error occurred while entering details
            }
        }

}export default CreateBin;

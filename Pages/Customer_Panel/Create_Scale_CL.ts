import { Locator, Page } from 'playwright';

class CreateScale_Cl {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async scaleNavigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Scales' }).click();
            let expectedURL = 'https://staging-app.linusanalytics.com/scales';
            await this.verifyNavigation(expectedURL);
            console.log('Successfully navigated to scale tab');
            return true; // Return true if all details were entered successfully
        } catch (error) {
            console.error('Error occurred while adding scale:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async verifyNavigation(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            return currentURL === url; // Return true if the current URL matches the expected URL
        } catch (error) {
            console.error('Error occurred while adding scale:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

    async verifyscale(page: Page, scaleName:string){

        await page.goto('https://staging-app.linusanalytics.com/dashboard');
        await page.getByRole('button', { name: 'Manage-icon Manage' }).click();
        await page.getByRole('button', { name: 'Scales' }).click();
        let expectedName = scaleName;
        await this.verifyNavigation(expectedName);
        console.log('Scale Verification successfully done');
        await page.getByRole('cell', { name: 'UK Scale' }).locator('div').click();

    }

    async verifiedscale(scale: string){
            try {
                const currentscale = this.page.url(); // Get the current URL
                console.log("Scale Verification Successfully Done");
                return currentscale === scale; // Return true if the current URL matches the expected URL
            } catch (error) {
                console.error('Error occurred while adding scale:', error);
                return false; // Return false if any error occurred while entering details
            }
        }
    }
    
    async clickAddScale(page: Page, scaleName:string) {
        try {
            
            await this.page.getByText("");
            let expectedName = scaleName;
            await this.scaleVerify(expectedName)
            console.log('Scale Verification Successfully')
            return true;
            
            await page.getByRole('button', { name: scaleName}).click();
            await page.getByLabel('ID').click();
            await page.getByLabel('ID').fill(scaleID);
            await page.getByLabel('Scale Name').click();
            await page.getByLabel('Scale Name').fill('Scale Name');
            // await page.getByLabel('Is this scale assigned to a').check();
            // await page.getByLabel('Select Machines').click();
            // await page.getByText('No options').click();
            // await page.getByLabel('Is this scale assigned to a').uncheck();
            await page.getByRole('button', { name: 'Save' }).click();

        } catch (error) {
            console.error("Error while clicking on Add Scale button:", error);
            return false; // Return false if any error occurs during the process
        }
    }


    async scaleVerify(url: string): Promise<boolean> {
        try {
            const currentURL = this.page.url(); // Get the current URL
            return currentURL === url; // Return true if the current URL matches the expected URL
        } catch (error) {
            console.error('Error occurred while adding customer:', error);
            return false; // Return false if any error occurred while entering details
        }
    }

}

class C {
  


    

    

    async enterScaleDetails(scaleName: string, scaleID: string) {
        await this.scalenameinput.fill(scaleName);
        await this.scaleIDinput.fill(scaleID);
    }

    async clickonscaleSavebtn() {
        await this.savebtn.click();
        console.log("Scale Update Successfully");
        
    }

    async searchscale(scaleNameValue: string) {

        try {
            this.selectCustomerName = this.page.locator(`//tr[@class="MuiTableRow-root mui-1734yg7"]/td/div/p[contains(text(),"${scaleNameValue}")]`);
            await this.selectCustomerName.click();
            console.log("Clicked on Selected Scale......!");
            return true; // Return true if the Scale is clicked successfully
        } catch (error) {
            console.error("Error in Scale List finding:", error);
            return false; // Return false if any error occurs during the process
        }

    }


    async verifyscale(scaleNameValue: string){

        try {
            this.selectCustomerName = this.page.locator(`//tr[@class="MuiTableRow-root mui-1734yg7"]/td/div/p[contains(text(),"${scaleNameValue}")]`);
            console.log("Scale Update Successfully......!");
            return true;
        } catch (error) {
            console.error("Scale not found:", error);
            return false;
        }
    }


    async update(scaleName:string,scaleId:string){

        try{
            await this.manage.click();
            console.log("Scale Update Model opened......!");

            await this.scalenameinput.clear();
            console.log("Scale Name field empty......!");
            await this.scalenameinput.fill(scaleName);

            await this.scaleIDinput.clear();
            console.log("Scale ID field empty......!");
            await this.scaleIDinput.fill(scaleId);
            return scaleName;

        }catch(error) {

            console.error("Error in Scale......:", error);
            return false;

        }

    }

    async logout(){

        await this.logoutlist.click();
        console.log("Log Out List Open");
        await this.page.waitForTimeout(5000);
        await this.loggedout.click();
        if(await this.signintext.isVisible(),{timeout:15000}){
            console.log("User Successfully Logged Out");
        }else{
            console.log("Log Out button not found");
        }


    }


    async  clearCache() {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
    
        // Clear the cache using page.evaluate()
        await page.evaluate(() => {
            // Clear all caches
            return window.caches.keys().then(cacheNames => {
                return Promise.all(cacheNames.map(cacheName => {
                    return window.caches.delete(cacheName);
                }));
            });
        });
    
        // Close the browser
        await browser.close();
    }
      


}export default CreateScale_Cl;

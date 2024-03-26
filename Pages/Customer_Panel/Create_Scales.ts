import { Page } from 'playwright';
import { expect } from 'playwright/test';

class CreateScale {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async getFacilityIdFromURL(): Promise<string | null> {
        const currentURL = this.page.url();
        const url = new URL(currentURL);
        const facilityId = url.searchParams.get('facilityId');
        return facilityId;
    }

    async verifyscale(scaleName: string) {
        await this.page.waitForNavigation({ timeout: 5000 });
        const currentURL = await this.page.url();
        console.log('Current URL:', currentURL);

        // const facilityIdValue= await this.getFacilityIdFromURL();
        // console.log('Facility ID:', facilityIdValue);
        // const expectedURLPart = 'https://staging-app.linusanalytics.com/dashboard?facilityId=';
        // await expect(this.page).toHaveURL(expectedURLPart);

        await this.page.getByRole('button', { name: 'Manage-icon Manage' }).click();

        await this.page.getByRole('button', { name: 'Scales' }).click();
        // await expect(this.page).toHaveURL('/^https:\/\/staging-app\.linusanalytics\.com\/scales\?facilityId=\d+$/;');
        console.log('User navigated to the scale page');
        // console.log("Scale Name Check ========> " + scaleName)
        await this.page.getByRole('cell', { name: scaleName }).locator('div').click();



        // const encodedScaleName = encodeURIComponent(scaleName); // Encode the scale name
        // let id;
        // let facilityId;

        // const expectedURL = `https://staging-app.linusanalytics.com/scales/${encodedScaleName}?facilityId=${facilityId}&id=${id}`;
        // await expect(this.page).toHaveURL(expectedURL);
        console.log('User navigated to the scale details page');
        await this.page.waitForTimeout(5000);

    }
    async verifyScaleName(scaleName: string): Promise<boolean> {
        try {

            await this.page.waitForTimeout(3000);
            const scaleList = await this.page.$$('//tr/td[1]/div/p[contains(text(),' + scaleName + ')]');

            if (scaleList.length > 0) {
                for (const element of scaleList) {
                    const scaleListText = await element.textContent();
                    if (scaleListText) { // Check if customerListText is not null
                        console.log("Scale Name ----------------> " + scaleListText);

                        if (scaleListText.trim().toLowerCase() === scaleName.trim().toLowerCase()) {
                            console.log("Scale Created ----------------> " + scaleName);
                            // await element.click();
                            return true; // Return true when customer is found
                        }
                    }
                }
                console.log("Scale Not Found In List ----------------> " + scaleName);
                return false; // Return false if customer is not found
            } else {
                console.log("Customer Data Not Found ----------------> " + scaleName);
                return false; // Return false if customer list is empty
            }
        } catch (error) {
            console.error("Error while checking Scale:", error);
            return false; // Return false if any error occurs during the process
        }
    }

}
export default CreateScale;


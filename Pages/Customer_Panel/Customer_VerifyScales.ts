import { Page } from 'playwright';
import { expect } from 'playwright/test';

class VerifyScale {
    private page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async getFacilityIdFromURL(): Promise<boolean> {
        try {
            const currentURL = this.page.url();
            const url = new URL(currentURL);
            const facilityId = url.searchParams.get('facilityId');
            const expectedURL = `https://staging-app.linusanalytics.com/scales?facilityId=${facilityId}`;
            await expect(this.page).toHaveURL(expectedURL);
            return true
        } catch (error) {
            console.error("Error getting facility ID from URL:", error);
            // Mark the test as failed
            throw new Error("Error while checking Scale: " + error);
        }
    }


    async verifyScaleDetails(scaleName: string): Promise<boolean> {
        try {
            await this.page.waitForTimeout(5000);

            // Remove the dashes and replace with spaces
            const adjustedScaleName = scaleName.replace(/-/g, ' ');

            // Locate the heading element by its role with adjusted name
            const headingElement = this.page.getByRole('heading', { name: adjustedScaleName });

            // Verify if the heading element exists
            if (!headingElement)
                throw new Error(`Heading element with name '${scaleName}' not found`);

            // Extract the text content of the heading element
            const headingText = await headingElement.textContent() as string;

            // Verify if the expected text is present in the heading element
            if (!headingText.includes(adjustedScaleName))
                throw new Error(`Heading text '${scaleName}' not found`);

            // If all verifications passed, return true
            return true;
        } catch (error) {
            // If any error occurs during verification, log it and mark the test as failed
            console.error("Verification failed:", error);
            throw new Error("Verification failed: " + error); // Mark the test as failed
        }
    }

    async verifyScaleName(scaleName: string): Promise<void> {
        try {
            // Wait for 3 seconds
            await this.page.waitForTimeout(3000);

            // Wait for the scale element to appear within 10 seconds
            const scaleElement = await this.page.waitForSelector('xpath=//tr/td[1]/div/p[contains(text(),' + scaleName + ')]', { timeout: 10000 });

            // Verify if the scale element exists
            if (!scaleElement) {
                console.log("Scale Not Found In List ----------------> " + scaleName);
                throw new Error("Scale not found in list: " + scaleName);
            }

            // Get the text content of the scale element
            const scaleText = await scaleElement.textContent();

            // Verify if the scaleText is not null or undefined
            if (scaleText === null || scaleText === undefined) {
                console.log("Scale Text is null or undefined for ----------------> " + scaleName);
                throw new Error("Scale text is null or undefined: " + scaleName);
            }

            // Check if the scale text matches the provided scaleName
            if (scaleText.trim().toLowerCase() === scaleName.trim().toLowerCase()) {
                console.log("Scale created by admin found in customer ----------------> " + scaleName);
                await scaleElement.click();

                // Assuming verifyScaleDetails returns a boolean
                const scaleDetailsVerified = await this.verifyScaleDetails(scaleName);
                if (!scaleDetailsVerified) {
                    throw new Error("Failed to verify scale details.");
                }
            } else {
                console.log("Scale Text Does Not Match ----------------> " + scaleName);
                throw new Error("Scale text does not match: " + scaleName);
            }
        } catch (error) {
            console.error("Error while checking Scale:", error);
            // Mark the test as failed
            throw new Error("Error while checking Scale: " + error);
        }
    }


    async scale_navigation(): Promise<boolean> {
        try {

            await this.page.getByRole('button', { name: 'Manage-icon Manage' }).click();
            await this.page.getByRole('button', { name: 'Scales' }).click();

            console.log('User navigated to scale page');
            return true; // Navigation successful
        } catch (error) {
            console.error("Error during scale navigation:", error);
            // Mark the test as failed
            throw new Error("Error during scale navigation: " + error);
        }
    }

}
export default VerifyScale;

